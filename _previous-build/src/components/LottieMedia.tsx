import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks';

type Props = {
  src: string;
  poster: string;
  alt: string;
  className?: string;
};

// Plays a transparent Lottie animation over its backdrop image once it nears the viewport.
// The backdrop holds the card's shape while loading and stays if the animation cannot load.
export function LottieMedia({ src, poster, alt, className }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let anim: import('lottie-web').AnimationItem | null = null;
    let cancelled = false;
    let visible = false;

    const load = async () => {
      try {
        const [{ default: lottie }, data] = await Promise.all([
          import('lottie-web/build/player/lottie_light'),
          fetch(src).then((r) => {
            if (!r.ok) throw new Error(String(r.status));
            return r.json();
          }),
        ]);
        if (cancelled) return;
        anim = lottie.loadAnimation({
          container: host,
          renderer: 'svg',
          loop: true,
          autoplay: false,
          animationData: data,
          rendererSettings: { preserveAspectRatio: 'xMidYMid slice', progressiveLoad: true },
        });
        anim.addEventListener('DOMLoaded', () => {
          if (cancelled || !anim) return;
          setReady(true);
          if (reduced) anim.goToAndStop(Math.round(anim.totalFrames * 0.35), true);
          else if (visible) anim.play();
        });
      } catch {
        // Poster stays in place; nothing else to do.
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !anim) load();
        if (anim && !reduced) visible ? anim.play() : anim.pause();
      },
      { rootMargin: '300px 0px' },
    );
    io.observe(host);

    return () => {
      cancelled = true;
      io.disconnect();
      anim?.destroy();
    };
  }, [src, reduced]);

  return (
    <div className={className} role="img" aria-label={alt} aria-busy={!ready}>
      <img className="lottie-poster" src={poster} alt="" aria-hidden="true" />
      <div ref={hostRef} className="lottie-host" aria-hidden="true" />
    </div>
  );
}
