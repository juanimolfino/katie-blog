import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Home, About, Destinations, Videos, Contact } from '@/pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="videos" element={<Videos />} />
          <Route path="contact" element={<Contact />} />
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
