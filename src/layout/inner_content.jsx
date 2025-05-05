import React, { useState, useEffect } from "react";
import { Movies, Preloader, Search } from "../components";

export function Main() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies("matrix");
  }, []);

  const fetchMovies = (str, type = "all") => {
    setLoading(true);
    fetch(`
      http://www.omdbapi.com/?apikey=be52c9ee&s=${str}${         
        type !== "all" ? `&type=${type}` : ""       }
    `)
      .then((responce) => responce.json())
      .then((data) => {
        setMovies(data.Search || []);
        setLoading(false);
      });
  };

  return (
    <main className="container content">
      <Search searchMovies={fetchMovies} />
      {loading ? <Preloader /> : <Movies movies={movies} />}
    </main>
  );
}