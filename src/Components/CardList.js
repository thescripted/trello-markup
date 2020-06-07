import React from 'react';
import Card from "./Card";

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
          <Card />
          <Card />
          <Card />
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
        <div className="add-another-card">
          <a href="/" className="card-composer">
            <span className="icon-add"></span>
            <span className="add-another-card-text">Add another card</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardList
