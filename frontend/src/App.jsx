"use client";
import axios from "axios";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home.jsx";
import ManageStore from "./pages/managestore.jsx";
import ReviewPage from "./pages/reviewpage.jsx";
import Profile from "./pages/profile.jsx";
import Login from "./pages/login.jsx";
import Questionnaire from "./pages/questionnaire.jsx";
import PaperGroup from "./pages/papergroup.jsx";
import Setting from "./pages/setting.jsx";

import { getUser } from "./features/userSlice.js";
import store from "./store";

const TOKEN = localStorage.getItem("token");
if (TOKEN) {
  axios.defaults.headers.common["Authorization"] = `${TOKEN}`;
  store.dispatch(getUser());
}

function App() {
  const { user } = useSelector((store) => store.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <ManageStore />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/login" element={<Login />} />
        {user && <Route path="/home" element={<Home />} />}
        {user && <Route path="/papersetting" element={<Setting />} />}
        {user && <Route path="/setting" element={<PaperGroup />} />}
        {user && <Route path="/managestore" element={<ManageStore />} />}
        {user && <Route path="/reviewpage" element={<ReviewPage />} />}
        {user && <Route path="/profile" element={<Profile />} />}
      </Routes>
    </Router>
  );
}

export default App;
