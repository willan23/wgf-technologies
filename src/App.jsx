import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ConsentProvider } from './context/ConsentContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import ProductDetail from './pages/ProductDetail';
import Technology from './pages/Technology';
import Markets from './pages/Markets';
import About from './pages/About';
import Founder from './pages/Founder';
import Investors from './pages/Investors';
import Opportunity from './pages/Opportunity';
import Partners from './pages/Partners';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import DataRoom from './pages/DataRoom';

export default function App() {
  return (
    <LanguageProvider>
      <ConsentProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="portfolio/:slug" element={<ProductDetail />} />
              <Route path="technology" element={<Technology />} />
              <Route path="markets" element={<Markets />} />
              <Route path="about" element={<About />} />
              <Route path="founder" element={<Founder />} />
              <Route path="investors" element={<Investors />} />
              <Route path="investors/opportunity" element={<Opportunity />} />
              <Route path="partners" element={<Partners />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="cookies" element={<Cookies />} />
              <Route path="investor-data-room" element={<DataRoom />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ConsentProvider>
    </LanguageProvider>
  );
}
