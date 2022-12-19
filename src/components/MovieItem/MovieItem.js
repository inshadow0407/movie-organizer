import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MovieItem.css';

class _MovieItem extends Component {
    render() {
        console.log(this.props);
        const { Title, Year, Poster, imdbID} = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" 
                            className="movie-item__add-button" 
                            onClick={()=>{this.props.dispatch({type:"ADD", payload:{ Title, Year, imdbID} })}}>
                            Добавить в список
                    </button>
                </div>
            </article>
        );
    }
}
let MovieItem = connect()(_MovieItem)
export default MovieItem;