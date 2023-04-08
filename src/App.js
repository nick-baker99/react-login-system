import Register from "./components/Register";
import styles from './app.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
