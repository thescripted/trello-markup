import React, { useState, useRef, useEffect } from "react"
import Card from "./Card"
import { AddCard } from "./AddCard"
import { useMutation } from "urql"
import { ADD_CARD_TO_LIST, DELETE_CARD_FROM_LIST } from "../Support/gql"

const CardList = ({
  title,
  id,
  cardData,
  deleteListByID,
  updateListByID,
  reexecuteQuery // Perhaps it'll be best to wrap reexecuteQuery in a HOC, triggers upon any mutation?
}) => {
  const [createCardResults, createCard] = useMutation(ADD_CARD_TO_LIST)
  const [deleteCardResults, deleteCard] = useMutation(DELETE_CARD_FROM_LIST)
  const [toggleHide, setToggleHide] = useState(true)
  const [titleMessage, setTitleMessage] = useState(title)
  const [message, setMessage] = useState("")
  const textFocus = useRef(null)

  useEffect(() => {
    if (textFocus && textFocus.current) {
      textFocus.current.focus()
    }
  }, [toggleHide])

  const handleHiding = () => {
    setToggleHide(!toggleHide)
  }

  const handleMessageSubmitter = e => {
    // triggers a new generated card and clears message/hiding
    if (message.trim() !== "") {
      createCard({
        list_id: parseInt(id),
        content: message
      }).then(result => {
        if (result.error) {
          console.log(result.error)
        } else console.log(result)
      })
      setMessage("")
    }

    if (e.keyCode !== 13) {
      handleHiding()
    } else {
      setMessage("")
      textFocus.current.focus()
    }
  }

  function deleteCardById(card_id, list_id) {
    deleteCard({
      card_id: parseInt(card_id),
      list_id: parseInt(list_id)
    }).then(result => {
      if (result.error) {
        console.log(result.error)
      } else {
        console.log(result)
      }
    })
    reexecuteQuery({
      requestPolicy: "cache-and-network"
    })
  }

  return (
    <div className='list-wrapper'>
      <div className='card-list'>
        <div className='header-list'>
          <textarea
            className='header-list-name f16'
            rows='1'
            spellCheck='false'
            value={titleMessage}
            onChange={e => setTitleMessage(e.target.value)}
            onKeyDown={e => {
              e.keyCode === 13 && document.activeElement.blur()
            }}
            onBlur={() => updateListByID(id, titleMessage)}
          />
          <button className='cancel-button' onClick={() => deleteListByID(id)}>
            x
          </button>
        </div>
        <div className='list-card list-scroll'>
          {cardData.map(cards => (
            <Card
              key={cards.card_id}
              id={cards.card_id}
              text={cards.content}
              onDelete={() => deleteCardById(cards.card_id, id)}
            />
          ))}
          <div className={toggleHide ? "hide" : "cc-input-container"}>
            <div className='card-list-input'>
              <textarea
                ref={textFocus}
                className='card-list-textarea'
                dir='auto'
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder='Add a new card…'
              ></textarea>
            </div>
            <div className='card-list-control'>
              <input
                autoFocus
                className='primary'
                type='submit'
                value='Add Card'
                onClick={e => handleMessageSubmitter(e)}
              />
              {/* eslint-disable-next-line */}
              <a
                className='icon-close'
                href='#'
                onClick={() => handleHiding()}
              />
            </div>
          </div>
        </div>
        <AddCard handleHiding={handleHiding} toggleHide={toggleHide} />
      </div>
    </div>
  )
}

export default CardList
