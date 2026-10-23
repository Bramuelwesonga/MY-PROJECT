import { useEffect } from 'react'; /* Lets us run code when the app loads */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; /* Routing components */
import Header from './components/header'; /* Header (file name must match exactly, including capitals) */
import Footer from './components/Footer'; /* Footer shown on every page */
import Hero from './components/Hero'; /* Hero section of the homepage */
import Services from './components/Services'; /* Services section of the homepage */
import Partners from './components/Partners'; /* Partners section of the homepage */
import MCVStudio from './pages/Mcvstudio'; /* MCV Studio page */
// import MCVEvents from './pages/MCVEvents'; /* Uncomment when you create this page */
// import MCVDesigns from './pages/MCVDesigns'; /* Uncomment when you create this page */
import './App.css'; /* App styles */
import './index.css'; /* Global styles */

function App() {
  /* TEMPORARY TEST: checks that the backend and database are reachable.
     Delete this whole block once you see the success message in the console. */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/test`) /* Address comes from client .env */
      .then((res) => res.json()) /* Convert the reply into a JavaScript object */
      .then((json) => console.log('Backend says:', json)) /* Show it in the browser console (F12) */
      .catch((err) => console.error('Backend error:', err)); /* Show any failure */
  }, []); /* [] = run only once, when the app first loads */

  return (
    <Router> {/* Wrap everything in Router to enable page routing */}
      <Header /> {/* Header appears on all pages */}

      <Routes> {/* List of all pages and their addresses */}
        {/* Homepage */}
        <Route
          path="/" /* Root address: localhost:5173/ */
          element={
            <>
              <Hero /> {/* Hero section */}
              <Services /> {/* Services section */}
              <Partners /> {/* Partners section */}
            </>
          }
        />

        {/* MCV Studio page */}
        <Route
          path="/mcv-studio" /* localhost:5173/mcv-studio */
          element={<MCVStudio />}
        />

        {/* Add these when the pages exist:
        <Route path="/mcv-events" element={<MCVEvents />} />
        <Route path="/mcv-designs" element={<MCVDesigns />} />
        */}
      </Routes>

      <Footer /> {/* Footer appears on all pages */}
    </Router>
  );
}

export default App; /* Make App available to main.jsx */