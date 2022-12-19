import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Favorites.css';


class _Favorites extends Component {
    render() { 
        console.log(this.props.favorites)
        return (
            <div className="favorites">
                <input value={this.props.favorites.Title} className="favorites__name" onChange={(event)=>{
                   this.props.dispatch({type:"ADD_TITLE", payload:event.target.value})
                }}/>
                <ul className="favorites__list">
                    {this.props.favorites.movies.map((item) => {
                        return <li key={item.imdbID}>{item.Title} ({item.Year})
                                    <button className="remove" 
                                        onClick={()=>{this.props.dispatch({type:"REMOVE", payload:item.Title})}}>
                                         X
                                    </button>
                                </li>;
                    })}
                </ul>
                <button type="button" className="favorites__save">Сохранить список</button>
            </div>
        );
    }
}

export let Favorites = connect((state) => ({
    favorites: state.favorites
  }))(_Favorites);