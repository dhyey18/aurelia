export function EqIndicator({ className = "" }: { className?: string }) {
  return (
    <span className={`eq-mini ${className}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}
