export default function Sort({ sortKey, setSortKey, sortOrder, setSortOrder }) {
  return (
    <div className="flex gap-2">
      <select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
        className="px-3 py-2 border rounded-md"
      >
        <option value="title">Sortieren nach Titel</option>
        <option value="year">Sortieren nach Jahr</option>
      </select>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="px-3 py-2 border rounded-md"
      >
        <option value="asc">Aufsteigend</option>
        <option value="desc">Absteigend</option>
      </select>
    </div>
  );
}
