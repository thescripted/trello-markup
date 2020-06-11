import React, { useState, useRef, useEffect } from 'react';

export const AddCard = (props) => {
    const [toggleCardCreator, setToggleCardCreator] = useState(false);
    const textFocus = useRef(null);

    const handleCreateCard = () => {
        setToggleCardCreator(!toggleCardCreator)
    }

    useEffect(() => {
        if (textFocus && textFocus.current) {
            textFocus.current.focus()
        }
    }, [toggleCardCreator])

    return (
        <div className="add-another-card">
            {!toggleCardCreator ? (
                <div role="button" className="card-composer" onClick={handleCreateCard}>
                    <span className="icon-add"></span>
                    <span className="add-another-card-text">Add another card</span>
                </div>
            ) : (
                    <React.Fragment>
                        <div className="card-list-input">
                            <textarea ref={textFocus} className="card-list-textarea" dir="auto" placeholder="Enter a title for this card…"></textarea>
                        </div>
                        <div className="card-list-control">
                            <input className="primary" type="submit" value="Add Card" onClick={handleCreateCard} />
                            { /* eslint-disable-next-line */}
                            <a className="icon-close" href="#" onClick={handleCreateCard} />
                        </div>
                    </React.Fragment>
                )}
        </div>
    );
}