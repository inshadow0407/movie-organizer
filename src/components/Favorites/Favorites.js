import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Favorites.css';
import {saveList} from "../../store/store"


class _Favorites extends Component {
    clickHandler=(event)=>{
        this.props.dispatch(saveList());
        document.querySelector(".favorites__name").disabled=true;
        event.target.remove()
    }
    render() { 
        console.log(this.props.favorites)
        return (
            <div className="favorites">
                <input value={this.props.favorites.Title} className="favorites__name" onChange={(event)=>{
                   this.props.dispatch({type:"ADD_TITLE", payload:event.target.value})
                }}/>
                <ul className="favorites__list">
                    {this.props.favorites.movies.map((item) => {
                        if(item.imdbID){
                        return <li key={item.imdbID}>{item.Title} ({item.Year})
                                    <button className="remove" 
                                        onClick={()=>{this.props.dispatch({type:"REMOVE", payload:item.Title})}}>
                                         X
                                    </button>
                                </li>}
                                else return null;
                    })}
                </ul>
                <button type="button" className="favorites__save" onClick={this.clickHandler}>Сохранить список</button>
                {(this.props.favorites.list.id===undefined)? null: <Link to={"/list/"+this.props.favorites.list.id}>{this.props.favorites.list.title}</Link>}
            </div>
        );
    }
}

export let Favorites = connect((state) => ({
    favorites: state.favorites
  }))(_Favorites);