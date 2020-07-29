import React from "react"
import { useDrag } from "react-dnd"

const Types = {
  CARD: "card"
}

const Card = ({ text, onDelete }) => {
  const consoleFun = a => console.log("Hello", a)
  const hey = "Hey"
  return (
    <div className='card-component f14 lh20'>
      <div className='card-title'>{text}</div>
      <button
        className='cancel-button'
        style={{ opacity: 0.65 }}
        onClick={onDelete}
      >
        x
      </button>
    </div>
  )
}

export default Card
