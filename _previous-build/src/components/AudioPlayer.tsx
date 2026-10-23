import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpIcon, PauseIcon, PlayIcon } from './Icons';
import './AudioPlayer.css';

const BARS = 40;

export function AudioPlayer({ src, label }: { src: string; label: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  // Fixed, voice-like bar heights so the waveform reads as speech, not noise.
  const heights = useMemo(
    () => Array.from({ length: BARS }, (_, i) => 0.35 + 0.65 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45))),
    [],
  );

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.duration ? a.currentTime / a.duration : 0);
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    const onPlaying = () => setStatus('idle');
    const onWaiting = () => setStatus('loading');
    const onError = () => {
      setStatus('error');
      setPlaying(false);
    };
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('ended', onEnd);
    a.addEventListener('playing', onPlaying);
    a.addEventListener('waiting', onWaiting);
    a.addEventListener('error', onError);
    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('ended', onEnd);
      a.removeEventListener('playing', onPlaying);
      a.removeEventListener('waiting', onWaiting);
      a.removeEventListener('error', onError);
    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      return;
    }
    try {
      setStatus('loading');
      await a.play();
      setPlaying(true);
      setStatus('idle');
    } catch {
      setStatus('error');
      setPlaying(false);
    }
  };

  const played = Math.round(progress * BARS);

  return (
    <div className="audio">
      <div className={`audio__row${playing ? ' is-playing' : ''}`}>
        <button
          type="button"
          className="audio__button"
          onClick={toggle}
          aria-label={playing ? 'Pause voice note' : 'Play voice note'}
          aria-pressed={playing}
          aria-busy={status === 'loading'}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <div className="audio__wave" aria-hidden="true">
          {heights.map((h, i) => (
            <span
              key={i}
              className={`audio__bar${i < played ? ' is-played' : ''}`}
              style={{ '--h': h, '--d': `${(i % 7) * 70}ms` } as CSSProperties}
            />
          ))}
        </div>
        <audio ref={audioRef} src={src} preload="none" />
      </div>
      <p className="audio__label" aria-live="polite">
        {status === 'error' ? (
          'Could not play the voice note. Check your connection and try again.'
        ) : (
          <>
            <ArrowUpIcon size={16} /> {label}
          </>
        )}
      </p>
    </div>
  );
}
