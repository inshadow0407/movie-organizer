import React, { Component } from 'react';
import './ListPage.css';
import { connect } from 'react-redux';

class _ListPage extends Component {
    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.props.favorites.list.title}</h1>
                <ul>
                    {this.props.favorites.list.mymovies.map((item) => {
                        console.log(item[0]);
                        console.log(item.Title);
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${item.imdbID}`}>{item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

let ListPage = connect((state)=>({
    favorites: state.favorites
}))(_ListPage);
export default ListPage;