import { Route } from "react-router-dom";
import NavBar from "./components/NavBar";

import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading]= useState(false)
  const [error, setError]=useState(null)
  const [isShown ,setIsShown] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true)
    setError(null);
    try {
     const response = await fetch("https://swapi.dev/api/film/");
     if (!response.ok){
      throw new Error(`something Went wrong! `);
     }
     const data = await response.json();

     const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
      })
      setMovies(transformedMovies);
      
    }catch(error){
      setError(error.message);
    }
     setIsLoading(false);
     
  }
  const Reload = <NavBar reload="Retrying" />;

  useEffect(()=>{
   const timmer= setTimeout(() => {
      setIsShown(true)
    }, 5000);
    return () => clearTimeout(timmer)
  },[])

  const CloseHandler=() =>{
    setIsShown(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        {isShown && <button onClick={CloseHandler}>Cancel</button>}
      </section>

      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}

        {!isLoading && movies.length === 0 && !error && <p>No movies Found</p>}
        {!isLoading && error && isShown &&(
          <p>
            {error} { Reload }
          </p>
        )}
        {isLoading && <p>Loading..</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
