export default function Filter({ tab, setTab, options }) {
  return (
    <div className="flex gap-4 mb-6">
      {options.map((option) => (
        <button
          key={option.value}
          className={`px-4 py-2 rounded-md ${
            tab === option.value ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
