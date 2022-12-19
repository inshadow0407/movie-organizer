import { createStore, combineReducers } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

let initialState  = {
    Title: "Новый список",
    movies: [],
    list:{}
}
let searchResult =
    { 
        status:"fullfilled",
        movies: []
    }
    //GET запрос для поиска фильма на сервере params=слово по которому ведется поиск
export let findMovies = (params)=>(dispatch)=>{
        dispatch({type:"LOADING"})
        fetch("http://www.omdbapi.com/?apikey=2ae0655b&s="+params)
        .then((response)=>response.json())
        .then(data=>dispatch({type:"FIND", payload:data}))
}
//POST запрос для отправки списка на сервер и получения id
 export let saveList = ()=>(dispatch)=>{
    fetch("https://acb-api.algoritmika.org/api/movies/list", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(
            {
            title:store.getState().favorites.Title, 
            movies: store.getState().favorites.movies.map((movie)=>movie)
            }
            )
      })
    .then((response)=>response.json())
    .then(data=>{
        dispatch({type:"SAVE", payload: data})
    })
    
}

let searchResultList=(state=searchResult,action)=>{
    //Поиск фильма на сервере по введенному слову 
    if(action.type==="FIND"){
       return  {
        status:"fullfilled",
        movies:action.payload.Search
       }
    }
    else if(action.type==="LOADING"){
           return { status:"loading"}
    }
    else return state;
}

let MovieList = (state=initialState,action)=>{
    //добавление фильма в список
    if(action.type==="ADD"){
        if(state.movies.find((item)=>item.imdbID===action.payload.imdbID)){
            return state
        }
        else{
        return {
            ...state,
            movies:[...state.movies, action.payload]
            
        }
    }
    }
    //Добавление названия списка
    else if(action.type==="ADD_TITLE"){
        return {
            ...state,
            Title:action.payload}
    }
    //удаление фильма из списка
    else if(action.type==="REMOVE"){
        return { 
            ...state,
           movies: state.movies.filter((movie)=>{
           if (movie.Title!==action.payload) return movie;
        })
        }
    }
    //сохранение id полученного списка в store
    else if(action.type==="SAVE"){
        return {
            ...state,
            list:{
                id:action.payload.id,
                title:action.payload.title,
                mymovies:action.payload.movies.map((item)=>{
                    return item
                })
            }
        }
    }
    else return state;
}
// создаю store 
export const store = createStore(
  combineReducers({
    favorites: MovieList, 
    searchResult:searchResultList
  }),applyMiddleware(thunk)
);