import React, { Component } from 'react';
import './ListPage.css';
import { connect } from 'react-redux';

class _ListPage extends Component {
    
    componentDidMount() {
        //const id = this.props.match.params;
        //console.log(id);
        // TODO: запрос к сервер на получение списка
        // TODO: запросы к серверу по всем imdbID
    }
    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.props.favorites.list.title}</h1>
                <ul>
                    {this.props.favorites.list.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href="https://www.imdb.com/title/tt0068646/" target="_blank">{item.title} ({item.year})</a>
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