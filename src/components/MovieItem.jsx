import React from 'react';

const MovieItem = ({ movie, onSelectMovie }) => {
    // console.log('movie', movie)
  return (
    <div className="movie-item" onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={movie.Title} className="movie-poster"/>
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieItem;
