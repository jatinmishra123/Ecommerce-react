import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Men from "./pages/Men.jsx";
import Women from "./pages/Women.jsx";
import Kids from "./pages/Kids.jsx";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";


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
          <Route path="/kids" element={<Kids />} />
<Route path="/profile" element={<Profile />} />

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
