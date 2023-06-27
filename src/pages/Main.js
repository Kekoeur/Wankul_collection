import React from 'react';
import { Routes, Route } from 'react-router-dom';
import data from '../data/cards.json';
import Card from '../components/Card';
import Collection from '../components/Collection';

const Main = props => (
    <Routes>
        <Route path="/" element={<div>Rien </div>} />
        <Route path="/Collection" element={<Collection data={data}/>} />
        <Route path="/Collection/:id" element={<Collection data={data}/>} />
        <Route path="/Card/:id" element={<Card data={data}/>} />
    </Routes>
)

export default Main;