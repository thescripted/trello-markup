import React, { useState, useRef, useEffect } from "react"
import Card from "./Card"
import { AddCard } from "./AddCard"
import { useMutation } from "urql"

const ADD_CARD_TO_LIST = `
mutation($list_id: Int!, $content: String!) {
  addCardToList(list_id: $list_id,  content: $content) {
    content
    card_id
  }
}`

const CardList = ({ title, id, cardData, deleteListByID, updateListByID }) => {
  const [createCardResults, createCard] = useMutation(ADD_CARD_TO_LIST)
  const [toggleHide, setToggleHide] = useState(true)
  const [titleMessage, setTitleMessage] = useState(title)
  const [message, setMessage] = useState("")
  const textFocus = useRef(null)

  useEffect(() => {
    if (textFocus && textFocus.current) {
      textFocus.current.focus()
    }
    console.log(textFocus.current)
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
            <Card key={cards.card_id} id={cards.card_id} text={cards.content} />
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
