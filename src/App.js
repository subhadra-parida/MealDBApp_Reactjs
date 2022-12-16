import react, {useState,useEffect} from "react";
import './App.css';
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
const search = require("lodash") 
export default function Home(){
  const [data,setData]  = useState([])
  const [searchdata, setSearchdata] = useState("")
  const [editdata, setEditdata] = useState([])
  // const [addtocart, setAddtocart]= useState([])
  const [array, setArray] = useState([])
  console.log(array)

  const getData=async()=>{
    const Response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
    const Result = await Response.json();
    setData(Result.meals)
  }
  useEffect(()=>{
    getData()
  },[])
  // console.log(data)

const addItem = (item,index)=>{
  let object={
    "meal" : item.strMeal,
    "price" : 50
  }
  setArray([...array,object])
}

  const searchItem=()=>{
    if (searchdata.length>3){
      let editdataItems = search.filter(data,{"strCategory":searchdata})
      setEditdata(editdataItems)
    }
  }
return(
  <div id="maincontainer">
  <div id="header">
    <img src="https://www.themealdb.com/images/logo-small.png" alt=" " id="header_image"></img>
    <input type="text" id="searchBox" placeholder="Search any Item..." onChange={(i)=>{
      setSearchdata(i.target.value)
      searchItem()
    }} ></input>
  </div>
  <h1 id="font">Welcome To The MealDB</h1>
  <div id="flex">
    {
      searchdata.length>3?editdata.map((item,index)=>{
        return(
          <div id="box">
              <img id="images" src={item.strMealThumb}></img>
              <h4 id="name">{item.strMeal}</h4>
              <h4 id="category">{item.strCategory}</h4>
              <span id="button">
              <button id="Rupees">Rs.50</button>
              <button id="cart">Add to cart</button>
              </span>
          </div>
        )
      }):
      data.map((item,index)=>{
        return(
          <div>
             <img id="images" src={item.strMealThumb}></img>
              <h4 id="name">{item.strMeal}</h4>
              <h4 id="category">{item.strCategory}</h4>
              <span id="button" >
              <button id="Rupees">Rs.50</button>
              <button id="cart" onClick={()=>{
                addItem(item)
              }}>Add to cart</button>
              </span>
          </div>
        )
      })
    } 
  </div>
  </div>
)
}

