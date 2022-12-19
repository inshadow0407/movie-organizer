import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

class _Movies extends Component {
    render() { 
        if(this.props.searchResult.movies) {
        return (
            
            <ul className="movies">
                {this.props.searchResult.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie}/>
                    </li>
                ))}
            </ul>
        );
                }
                else return (<p className='loading'>LOADING...</p>)
    }
}
let Movies = connect((state)=>({
    searchResult:state.searchResult
}))(_Movies)
export default Movies;