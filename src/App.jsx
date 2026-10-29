import TopBar from "./components/layout/TopBar";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import MarqueeBand from "./components/sections/MarqueeBand";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border-2 focus:border-ink focus:bg-paper focus:px-5 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.12em] focus:text-ink"
      >
        Saltar al contenido
      </a>

      <TopBar />
      <Navbar />

      <main id="contenido">
        <Hero />
        <MarqueeBand />
      </main>

      <Footer />
    </>
  );
}

export default App;
