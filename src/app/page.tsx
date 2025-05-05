import SearchBar from "./components/SearchBar";

export default function MainPage() {
  return (
    <main
      className="flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <div className="w-full max-w-lg px-4">
        <h3 className="text-3xl font-bold mb-6 text-center">
          Search Properties
        </h3>
        <SearchBar />
      </div>
    </main>
  );
}
