import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { PauseIcon, PlayIcon } from './Icons';
import './VoiceNote.css';

const BARS = 28;

/** Glass pill that plays a short voice note, with a waveform that fills as it plays. */
export function VoiceNote({ src, label }: { src: string; label: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const heights = useMemo(
    () => Array.from({ length: BARS }, (_, i) => 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45))),
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
    const onWaiting = () => setStatus('loading');
    const onPlaying = () => setStatus('idle');
    const onError = () => {
      setStatus('error');
      setPlaying(false);
    };
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('ended', onEnd);
    a.addEventListener('waiting', onWaiting);
    a.addEventListener('playing', onPlaying);
    a.addEventListener('error', onError);
    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('ended', onEnd);
      a.removeEventListener('waiting', onWaiting);
      a.removeEventListener('playing', onPlaying);
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
    }
  };

  const played = Math.round(progress * BARS);

  return (
    <div className={`voice${playing ? ' is-playing' : ''}`}>
      <button
        type="button"
        className="voice__button"
        onClick={toggle}
        aria-label={playing ? 'Pause voice note' : 'Play voice note'}
        aria-busy={status === 'loading'}
      >
        {playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
      </button>
      <span className="voice__wave" aria-hidden="true">
        {heights.map((h, i) => (
          <span
            key={i}
            className={`voice__bar${i < played ? ' is-played' : ''}`}
            style={{ '--h': h, '--d': `${(i % 7) * 70}ms` } as CSSProperties}
          />
        ))}
      </span>
      <span className="voice__label" aria-live="polite">
        {status === 'error' ? 'Could not play. Check your connection and try again.' : label}
      </span>
      <audio ref={audioRef} src={src} preload="none" />
    </div>
  );
}
