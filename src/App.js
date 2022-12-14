import { Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import FormInput from "./components/Form/FormInput";
import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading]= useState(false)
  const [error, setError]=useState(null)
  const [isShown ,setIsShown] = useState(false);

  const  fetchMoviesHandler = useCallback( async ()=> {
    setIsLoading(true)
    setError(null);
    try {
     const response = await fetch("https://swapi.dev/api/films/");
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
     
  },[])
  useEffect(() => {
    fetchMoviesHandler();
  },[fetchMoviesHandler]);
  
  const Reload = <NavBar reload="Retrying" />;

  useEffect(()=>{
   const timer= setTimeout(() => {
      setIsShown(true)
    }, 5000);
    return () => clearTimeout(timer)
  },[])

  const CloseHandler=() =>{
    setIsShown(false)
  }

  return (
    <React.Fragment>
     <FormInput/>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>

      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}

        {!isLoading && movies.length === 0 && <p>No movies Found</p>}
        {!isLoading && error && isShown && (
          <p>
            {error} {Reload}
          </p>
        )}
        {isLoading && <p>Loading..</p>}
        {error && isShown && <button onClick={CloseHandler}>Cancel</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
