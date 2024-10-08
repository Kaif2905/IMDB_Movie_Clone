import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch(
            "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
        )
            .then((res) => res.json())
            .then((data) => setPopularMovies(data.results));
    }, []);

    const handleSearch = () => {
        if (searchTerm) {
            fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${searchTerm}`
            )
                .then((res) => res.json())
                .then((data) => setSearchResults(data.results));
        }
    };

    return (
        <>
            <div className="search">
                <input className="s1"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn" onClick={handleSearch}>Search</button>
            </div>

            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {(searchResults.length > 0 ? searchResults : popularMovies).map(
                        (movie) => (
                            <Link
                                key={movie.id}
                                style={{ textDecoration: "none", color: "white" }}
                                to={`/movie/${movie.id}`}
                            >
                                <div className="posterImage">
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path
                                            }`}
                                        alt={movie.original_title}
                                    />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">
                                        {movie ? movie.original_title : ""}
                                    </div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.vote_average : ""}
                                            <i className="fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">
                                        {movie ? movie.overview : ""}
                                    </div>
                                </div>
                            </Link>
                        )
                    )}
                </Carousel>
                <MovieList />
            </div>
        </>
    );
};

export default Home;
