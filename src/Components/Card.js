import React from "react"
import { useDrag } from "react-dnd"

const Types = {
  CARD: "card"
}

const Card = ({ text, id }) => {
  const [collectedProps, drag] = useDrag({
    item: { type: Types.CARD, id }
  })
  return (
    <div className='card-component f14 lh20' ref={drag}>
      <div className='card-title'>{text}</div>
    </div>
  )
}

export default Card
