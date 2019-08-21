import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ searchUsers, clearUsers, clearBtn, setAlert }) => {
  const [text, setText] = useState("");

  const textChangeHandler = e => {
    setText(e.target.value);
  };
  const submitClickHandler = e => {
    e.preventDefault();
    if (text === "") {
      setAlert("Pls enter something", "light");
    } else {
      searchUsers(text);
      setText("");
    }
  };
  let button = null;
  if (clearBtn) {
    button = (
      <button className='btn btn-light btn-block' onClick={clearUsers}>
        Clear
      </button>
    );
  }
  return (
    <div>
      <form className='form' onSubmit={submitClickHandler}>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          onChange={textChangeHandler}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {button}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  clearBtn: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default Search;
