import { createStore, combineReducers } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

let initialState  = {
    Title: "Новый Список",
    movies: [
        { Title: 'The Godfather', Year: 1972, imdbID: 'tt0068646' }
    ]
}
let searchResult =
    { 
        status:"fullfilled",
        movies: [
            {
                imdbID: 'tt3896198',
                Title: "Guardians of the Galaxy Vol. 2",
                Year: 2017,
                Poster: "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"

            },
            {
                imdbID: 'tt0068646',
                Title: "The Godfather",
                Year: 1972,
                Poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"

            },
            

        ]
    }

export let findMovies = (params)=>(dispatch)=>{
        dispatch({type:"LOADING"})
        fetch("http://www.omdbapi.com/?apikey=2ae0655b&s="+params)
        .then((response)=>response.json())
        .then(data=>dispatch({type:"FIND", payload:data}))
        console.log(params);
}


let searchResultList=(state=searchResult,action)=>{
    if(action.type==="FIND"){
        console.log(action.payload);
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
    else if(action.type==="ADD_TITLE"){
        return {
            ...state,
            Title:action.payload}
    }
    else if(action.type==="REMOVE"){
        console.log(action.payload);
        return { 
            ...state,
           movies: state.movies.filter((movie)=>{
           if (movie.Title!==action.payload) return movie;
        })
        }
    }
    else return state;
}

export const store = createStore(
  combineReducers({
    favorites: MovieList,
    searchResult:searchResultList
  }),applyMiddleware(thunk)
);