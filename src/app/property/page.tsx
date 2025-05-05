import SearchBar from "../components/SearchBar";

export default function PropertyPage() {
  return (
    <main style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <SearchBar />
      </div>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"></div>
    </main>
  );
}
