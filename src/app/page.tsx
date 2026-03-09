import SearchBar from "@/components/search/SearchBar";

export default function MainPage() {
  return (
    <main className="flex-1 flex flex-col">
      <section
        id="hero"
        className="flex flex-col flex-1 items-center justify-center p-4"
      >
        <div className="w-full max-w-3xl text-center mb-8">
          <p className="text-text-accent font-semibold text-sm mb-5">
            RENT TRANSPARENCY FOR IRELAND
          </p>

          <h1 className="hero-title text-5xl font-bold mb-5">
            How much
            <br />
            is your <em>rent?</em>
          </h1>
          <p className="text-text-light mb-8">
            Real rents, paid by real tenants across Ireland. Search any address
            and see what people actually pay — not just what landlords are
            asking.
          </p>
          <SearchBar action="/properties" />
          <p className="text-text-light text-sm py-2">
            {"Can't find your property?"}
            <a
              href="#"
              className="text-text-accent no-underline font-semibold ml-1"
            >
              Add it here →
            </a>
          </p>
        </div>
        <div
          className="stats-wrapper w-full max-w-3xl flex justify-center"
          data-testid="stats-wrapper"
        >
          <div className="text-center" data-testid="stat">
            <div className="stat-number">2,841</div>
            <div className="stat-label">Properties tracked</div>
          </div>
          <div className="stat-divider"></div>
          <div className="text-center" data-testid="stat">
            <div className="stat-number">26</div>
            <div className="stat-label">Counties covered</div>
          </div>
        </div>
      </section>
    </main>
  );
}
