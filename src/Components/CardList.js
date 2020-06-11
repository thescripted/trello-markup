import React from 'react';
import Card from "./Card";
import { AddCard } from './AddCard';

const CardList = () => {
  return (
    <div className="list-wrapper">
      <div className="card-list">
        <div className="header-list">
          <textarea className="header-list-name f16" spellCheck="false">
            To-Do
          </textarea>
        </div>
        <div className="list-card list-scroll">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <AddCard />
      </div>
    </div>
  );
};

export default CardList
