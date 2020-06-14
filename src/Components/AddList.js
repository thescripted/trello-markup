import React from 'react';

const AddList = ({ handleListHiding, toggleListHide }) => {
    return (
        <div className={toggleListHide ? "list-wrapper add-another-list" : "hide"}>
            <div className="list-composer" role="button" onClick={handleListHiding}>
                <span className="icon-add"></span>
                <span className="add-another-list-text">Add another list</span>
            </div>
        </div>
    )
}


export default AddList;