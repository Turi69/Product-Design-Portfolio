import './RollText.css';

/** Label that rolls up to a duplicate of itself on hover or focus of its parent link. */
export function RollText({ children }: { children: string }) {
  return (
    <span className="roll" aria-hidden="false">
      <span className="roll__track">
        <span className="roll__face">{children}</span>
        <span className="roll__face roll__face--next" aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  );
}
