import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Men from "./pages/Men.jsx";
import Women from "./pages/Women.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <main className="main-content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div style={{ padding: "100px", textAlign: "center" }}>
                <h2>404 - Page Not Found</h2>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
