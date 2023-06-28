import React from 'react';
import { Routes, Route } from 'react-router-dom';
import data from '../data/cards.json';
import Card from '../components/Card/Card';
import Collection from '../components/Collection/Collection';
import Homepage from './Homepage';
import Login from '../components/User/Login';
import SignUp from '../components/User/SignUp';

const Main = props => (
    <Routes>
        <Route path="/" element={<Collection data={data} />} />
        <Route path="/Collection" element={<Collection data={data}/>} />
        <Route path="/Collection/:id" element={<Collection data={data}/>} />
        <Route path="/Card/:id" element={<Card data={data}/>} />
        <Route path="/Login" element={<Login onLogin={props.onLogin}/>} />
        <Route path="/SignUp" element={<SignUp onLogin={props.onLogin}/>} />
    </Routes>
)

export default Main;