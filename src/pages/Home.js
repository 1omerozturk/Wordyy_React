import { useEffect, useState } from "react";
import HomeCard from "./Card/HomeCard";
import { getAllWords } from "../api/api";

export function Home() {
  // const [data,setData]=useState(null)
// useEffect(()=>{
// const response=getAllWords();
// setData(response.data);
// },data)
  return (
    <div className="">
    <HomeCard/>
    </div>
  )
}
