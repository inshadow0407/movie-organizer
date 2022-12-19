import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ListPage from './pages/ListPage/ListPage';
import { connect } from 'react-redux';

import './reset.css';
import './common.css';

 class _App extends React.Component {
  render() {
    console.log(this.props.favorites.Title)
    return (<>
          
      <div className="app">
        <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/list/:id" element={<ListPage/>} />
        </Routes>
      </div>
      </>
    );
  }
} 
//Соединяю App и store
const mapStateToProps = (state) => ({
  favorites: state.favorites
});
export  let App= connect(mapStateToProps,)(_App)

