// import logo from './logo.svg';
import './App.css';
import React from "react";
import { Route, Routes } from 'react-router-dom'
import Login from './components/login/login';
import AdminDashboard from './components/adminDashboard/dashboard';
import CreateQuestion from './components/Question/createQuestion';
import GetTest from './components/Test/test';
import CreateQuestion1 from './components/Question/createQuestion1';
import CreateUser from './components/Users/createUser';
import AllUser from './components/Users/AllUser';
import UpdateUser from './components/Users/updateUser'


import UserDashboard from './components/userDashboard/userDashboeard'
import UserTech from './components/Test/Usertech';
import StartTest from './components/Test/attemptTest'

function App() {
  return (

  <Routes>
    <Route exact path='/adminDashboard/:userName' element={<AdminDashboard/>} />
    <Route exact path='/CreateQuestion/:userName' element={<CreateQuestion />} />
    <Route exact path='/getTest/:userName' element={<GetTest />} />
    <Route exact path='/getTest/createQuestion/:userName/:tech' element={<CreateQuestion1 />} />
    <Route exact path='/createUser/:userName' element={<CreateUser />} />
    <Route exact path='/allUsers/:userName' element={<AllUser />} />
    <Route exact path='/allUsers/updateUser/:User/:userName' element={<UpdateUser/>} />

    <Route exact path='/userDashboard/:userName' element={<UserDashboard/>} />
    <Route exact path='/userTech/:userName' element={<UserTech/>} />
    <Route exact path='/userTech/attemptTest/:userName/:tech' element={<StartTest/>} />
    <Route exact path='/' element={<Login />} />
  </Routes>
  
  )
}

export default App;
