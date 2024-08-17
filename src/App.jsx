import React, { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import Auth from "./pages/Auth";
import MainPage from "./pages/MainPage";
import Review from "./pages/Review";
import Restaurant from "./pages/Restaurant";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./component/Layout/Layout";

function App() {
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("/api/stores/search?latitude=33.2604516&longitude=126.5821358&range=1000");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data); // Log the fetched data to the console
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <div className="App">
      <div className="Content">
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/restaurant/:id/review" element={<Review />} />
              <Route path="/restaurant/:id" element={<Restaurant />} />
            </Routes>
          </Layout>
        </Router>
      </div>
    </div>
  );
}

export default App;
