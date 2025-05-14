export function WatchButton({ isWatched, onToggle }) {
  return (
    <button className="btn btn-primary" onClick={onToggle}>
      {isWatched ? "Unwatch" : "Watch"}
    </button>
  );
}
