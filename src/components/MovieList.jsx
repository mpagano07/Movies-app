import React from 'react';
import MovieItem from './MovieItem';

const MovieList = ({ movies, onSelectMovie }) => {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieItem key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </div>
  );
};

export default MovieList;
