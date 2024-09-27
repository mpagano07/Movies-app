import { useState, useCallback } from "react";

const useMovies = (apiKey) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const fetchAllMovies = useCallback(
    async (searchQuery, page = 1) => {
      setError("");
      setMovies([]);

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchQuery)}&page=${page}`
        );
        const data = await res.json();

        if (data.Response === "True") {
          setMovies(data.Search);
          setError("");
          return data;
        } else {
          setMovies([]);
          setError("Error al realizar la búsqueda.");
          return { totalResults: 0 };
        }
      } catch (err) {
        setError("Error al realizar la búsqueda.");
        setMovies([]);
        return { totalResults: 0 };
      }
    },
    [apiKey]
  );

  return { movies, error, fetchAllMovies };
};

export default useMovies;
