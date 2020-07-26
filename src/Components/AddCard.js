import React from "react"

export const AddCard = ({ handleHiding, toggleHide }) => {
  return (
    <div className={!toggleHide ? "hide" : "add-another-card"}>
      <div
        role='button'
        className='card-composer'
        onClick={() => handleHiding()}
      >
        <span className='icon-add'></span>
        <span className='add-another-card-text'>Add another card</span>
      </div>
    </div>
  )
}
