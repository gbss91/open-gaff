import MainSearch from "./components/MainSearch";

export default function MainPage() {
  return (
    <main
      className="flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <div className="w-full max-w-md px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Search Properties
        </h2>
        <MainSearch />
      </div>
    </main>
  );
}
