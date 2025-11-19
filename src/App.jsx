import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import StructureDetail from './pages/StructureDetail';
import About from './pages/About';

function App() {
  return (
    <Router basename="/cascade">
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold text-gray-900">
                Cascade
              </Link>
              <div className="space-x-8">
                <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </Link>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Submit a structure
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/structures/:businessType/:philosophy" element={<StructureDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
          <div className="container mx-auto px-4 py-6 text-center text-gray-600">
            <p>© 2025 Cascade - Open Source Folder Structure Directory</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
