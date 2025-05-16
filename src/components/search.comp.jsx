export default function SearchInput({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Suchen..."
      value={value}
      onChange={onChange}
      className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm"
    />
  );
}
