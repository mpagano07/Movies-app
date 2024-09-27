import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Pagination from './components/Pagination';
import useMovies from './hooks/useMovies';
import './App.css'

const App = () => {
  const [query, setQuery] = useState('');
  const [selectedMovieID, setSelectedMovieID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  const { movies, error, fetchAllMovies } = useMovies(apiKey);
  
  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    const lastPage = localStorage.getItem('lastPage');
    if (lastQuery) {
      setQuery(lastQuery);
      setCurrentPage(Number(lastPage) || 1);
      fetchAllMovies(lastQuery, Number(lastPage) || 1)
        .then(data => setTotalResults(Number(data.totalResults) || 0)); 
    }
  }, [fetchAllMovies]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1);
    fetchAllMovies(searchQuery, 1)
      .then(data => setTotalResults(Number(data.totalResults) || 0));
    localStorage.setItem('lastQuery', searchQuery);
    localStorage.setItem('lastPage', 1);
  };

  const handleSelectMovie = (imdbID) => {
    setSelectedMovieID(imdbID);
  };

  const handleCloseDetail = () => {
    setSelectedMovieID(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAllMovies(query, page)
      .then(data => setTotalResults(Number(data.totalResults) || 0));
    localStorage.setItem('lastPage', page);
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="container">
      <h1>Búsqueda de Películas</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error-message">{error}</p>}
      <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {selectedMovieID && (
        <MovieDetail imdbID={selectedMovieID} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default App;
