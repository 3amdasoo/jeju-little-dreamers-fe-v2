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
