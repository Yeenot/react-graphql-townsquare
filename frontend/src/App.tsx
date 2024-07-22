import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// MUI components
import Box from '@mui/material/Box';

// Pages
import HomePage from './pages/HomePage';

// Styles
import './App.css';

function App() {
  return (
    <Box>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
