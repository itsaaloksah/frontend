import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          {/* Protected Routes Starts */}
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<h1>Product Listing Components</h1>} />
            <Route path="/add" element={<h1>Add Product Components</h1>} />
            <Route path="/update" element={<h1>Update Product Components</h1>} />
            <Route path="/logout" element={<h1>Logout Components</h1>} />
            <Route path="/profile" element={<h1>Profile Components</h1>} />

          </Route>

          {/* Protected Routes Ends */}

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
