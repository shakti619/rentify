import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AddProperty from "./components/AddProperty";
import PropertyList from "./components/PropertyList";
import PropertyDetail from "./components/PropertyDetail";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/properties" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/add-property" element={<AddProperty token={token} />} />
          <Route
            path="/properties/:id"
            element={<PropertyDetail token={token} />}
          />
          <Route path="/properties" element={<PropertyList token={token} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
