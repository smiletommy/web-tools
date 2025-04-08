import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/home';
import TextTools from './pages/text-tools';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-tools" element={<TextTools />} />
          {/* Add more routes for individual tools here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
