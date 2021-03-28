import { CardList } from 'react-native-card-list'
import React from 'react'
import {useSelector}  from "react-redux"
import VolunteerCard from "./VolunteerCard"
import UserCard from "./UserCard"
import NewVolunteerCard from "./NewVolunteerCard"


function Tutorial(){

  let selector = useSelector(state =>state.uT.userType)

  if(selector === "normalUser") return <UserCard/>
  else if(selector === "newVolunteer") return <NewVolunteerCard/>
  else if(selector === "volunteer") return <VolunteerCard/>


}

export default Tutorial

