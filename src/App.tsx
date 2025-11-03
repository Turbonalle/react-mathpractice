import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DifficultySelect from './pages/DifficultySelect';
import GamePage from './pages/GamePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mode/:operation" element={<DifficultySelect />} />
        <Route path="/mode/:operation/:mode" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}