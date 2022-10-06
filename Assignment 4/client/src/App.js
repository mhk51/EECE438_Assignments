import React, {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios';

function App() {
  const [movieName, setMovieName]= useState("");
  const [review, setReview]= useState("");
  const [movieReviewList, setMovieList]=useState([]);
  const [searchWord,setSearchWord] = useState("");
  const [newReview, setNewReview]= useState("");
  const [resultReview,setResultReview] = useState("Empty");
  const [searchPressed,setSearchPressed] = useState(false);


  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data);
    });
  }, []);


  const submitReview=()=>{

    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

      setMovieList([
        ...movieReviewList,
        { movieName: movieName, movieReview: review },
      ]);
 };
 const sortMovies = ()=>{

    movieReviewList.sort(function(x, y) {
      if (x.movieName < y.movieName) {
        return -1;
      }
      if (x.movieName > y.movieName) {
        return 1;
      }
      return 0;
    });
    setMovieList([...movieReviewList]);
 };

 const searchMovie = () => {
    for(let i=0;i<movieReviewList.length;i++){
      if(movieReviewList[i].movieName == searchWord)
      {
        console.log(movieReviewList[i]);
        setResultReview(movieReviewList[i].movieReview);
      }
    }
    setSearchPressed(true);
 };

 const deleteReview = (movie) => {
   Axios.delete(`http://localhost:3001/api/delete/${movie}`);
 };

 const updateReview = (movie) => {
   Axios.put("http://localhost:3001/api/update", {
     movieName: movie,
     movieReview: newReview,
   });
   setNewReview("")
 };



  return (

    
    <div className="App"><h1> CRUD APPLICATION </h1>
      
    <html>
    <div className="form">
    <label>Movie Name:</label>
    <input type="text" name="movieName" onChange={(e)=>{
      setMovieName(e.target.value)
    }}/>
    <label>Review:</label>
    <input type="text" name="Review" onChange={(e)=>{
      setReview(e.target.value)
    }}/>
    <button  onClick={submitReview}> Submit </button>
    </div>

    <hr style={{border: "1px solid"}} className="solid"/>

    <div className="Search">
    <label>Search:   </label>
    <input type="text" name="movieName" onChange={(e)=>{
      setSearchWord(e.target.value)
    }}/>
    <button onClick={searchMovie}> Search</button>
    <div>
    {searchPressed ? (
      <div>
    <label>Result: </label>
    <label>{resultReview}</label>
    </div>
    ): (<div></div>)}
    </div>
    </div>

    <hr style={{border: "1px solid"}} className="solid"/>
    <button onClick={sortMovies}> Sort</button>


    <div className="movieList">
    {movieReviewList.map((val)=>{
      return (
        <div className="card">
          <h1> {val.movieName} </h1>
          <p> {val.movieReview} </p>

          <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
          <input type="text" id="updateInput" onChange={(e) => {setNewReview(e.target.value)}}/>
          <button onClick={()=> {updateReview(val.movieName)}}>Update</button>
        </div>
      );
    })}
    </div>
    </html>
</div>

);
}

export default App;
