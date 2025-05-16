import { useEffect, useState } from "react";
import { getAllMovies, getAllSeries } from "../services/localstorage";
import CardList from "../components/CardList";
import SearchInput from "../components/search.comp";
import Sort from "../components/sort.comp";
import Filter from "../components/filter.comp";

function Watchlist() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortKey, setSortKey] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [tab, setTab] = useState("all");

  useEffect(() => {
    setMovies(getAllMovies());
    setSeries(getAllSeries());
  }, []);

  const allItems = [
    ...movies.map((m) => ({ ...m, type: "movies" })),
    ...series.map((s) => ({ ...s, type: "series" })),
  ];

  let itemsToShow = allItems;
  if (tab === "movies")
    itemsToShow = allItems.filter((item) => item.type === "movies");
  if (tab === "series")
    itemsToShow = allItems.filter((item) => item.type === "series");

  const filtered = itemsToShow
    .filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      return sortOrder === "asc"
        ? aVal > bVal
          ? 1
          : -1
        : aVal < bVal
        ? 1
        : -1;
    });

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">👁️ Watchlist</h2>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-4 mb-6">
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <Sort
          sortKey={sortKey}
          setSortKey={setSortKey}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>

      <Filter
        tab={tab}
        setTab={setTab}
        options={[
          { label: "Alle", value: "all" },
          { label: "Filme", value: "movies" },
          { label: "Serien", value: "series" },
        ]}
      />

      <CardList
        cards={filtered}
        type={tab === "series" ? "series" : "movies"}
      />
    </div>
  );
}

export default Watchlist;
