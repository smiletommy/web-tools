import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/home';
import TextTools from './pages/text-tools';
import VocalRemover from './pages/vocal-remover';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-tools" element={<TextTools />} />
          <Route path="/vocal-remover" element={<VocalRemover />} />
          {/* Add more routes for individual tools here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
