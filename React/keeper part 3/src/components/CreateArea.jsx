import React, { useState } from "react";

function CreateArea({addNote}) {
  const [titleInputText, setTitleInputText] = useState('');
  const [contentInputText, setContentInputText] = useState('');

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    name === 'title' ? setTitleInputText(value) : setContentInputText(value);
  }
  
  const handleSubmit = (event) => {
    addNote(titleInputText, contentInputText);
    setTitleInputText('');
    setContentInputText('');
    event.preventDefault();
  }


  return (
    <div>
      <form>
        <input name="title" placeholder="Title" value={titleInputText} onChange={handleInputChange} />
        <textarea name="content" placeholder="Take a note..." rows="3" value={contentInputText} onChange={handleInputChange} />
        <button onClick={handleSubmit}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
