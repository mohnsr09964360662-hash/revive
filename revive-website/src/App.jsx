import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Programs from './pages/Programs';
import About from './pages/About';
import Donation from './pages/Donation';
import AICourses from './pages/AICourses';
import Contact from './pages/Contact';

const UserLayout = () => (
  <>
    <ScrollToTop />
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <div className="app-container">
      <ToastContainer position="top-center" rtl={true} theme="colored" />
      <Routes>
        {/* Public Website Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/about" element={<About />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/ai-courses" element={<AICourses />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
