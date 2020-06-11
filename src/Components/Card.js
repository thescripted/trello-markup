import React from 'react';

const Card = ({ text }) => {
  return (
    <div className="card-component f14 lh20">
      <div className="card-title">
        {text}
      </div>
    </div>
  );
};

export default Card;
