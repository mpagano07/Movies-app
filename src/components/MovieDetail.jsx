import React, { useEffect, useState } from 'react';

const MovieDetail = ({ imdbID, onClose }) => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState('');

  const apiKey = process.env.REACT_APP_OMDB_API_KEY;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`);
        const data = await res.json();
        if (data.Response === 'True') {
          setDetails(data);
        } else {
          setError('Error al obtener los detalles de la película.');
        }
      } catch (err) {
        setError('Error al obtener los detalles de la película.');
      }
    };
    fetchDetails();
  }, [imdbID, apiKey]);

  return (
    <>
    { details &&
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{details.Title} ({details.Year})</h2>
        <img
          src={details.Poster}
          alt={details.Title}
          className="detail-poster"
        />
        <p><strong>Sinopsis:</strong> {details.Plot}</p>
        <p><strong>Reparto:</strong> {details.Actors}</p>
        <p><strong>Director:</strong> {details.Director}</p>
        <p><strong>Género:</strong> {details.Genre}</p>
        <p><strong>Duración:</strong> {details.Runtime}</p>
      </div>
      {error && <p>{error}</p>}
    </div>}
    {!details && <p>Cargando...</p>}
    </>
  );
};

export default MovieDetail;
