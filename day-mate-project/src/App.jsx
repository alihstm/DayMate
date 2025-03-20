import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Enter from "../src/Components/Enter/enter";
import Login from "../src/Components/Login/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Enter />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
