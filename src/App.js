import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Episodes from './Episodes';
import Search from './Search';
import NotFound from './NotFound';
import Stream from './Stream';
import DramaSearch from './Drama/DramaSearch';
import DramaEpisodes from './Drama/DramaEpisodes';
import MovieSearch from './Movie/MovieSearch';
import MovieEpisodes from './Movie/MovieEpisodes';
import './App.css';

function MyApp() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Search/>} />
          <Route path="/watch/:id" element={<Episodes/>} />
          <Route path="/watch/:id/:epParam" element={<Episodes/>} />
          <Route path="/drama" element={<DramaSearch/>} />
          <Route path="/drama/drama-detail/:id" element={<DramaEpisodes/>} />
          <Route path="/drama/:id/:epParam" element={<DramaEpisodes/>} />
          <Route path="/movie" element={<MovieSearch/>} />
          <Route path="/movie/:id" element={<MovieEpisodes/>} />
          <Route path="/movie/:id/:epParam" element={<MovieEpisodes/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default MyApp;

