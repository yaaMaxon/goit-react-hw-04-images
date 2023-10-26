import React, { useState } from 'react';
import css from "./Searchbar.module.css";

export const Searchbar = ({ handleSubmitForm }) => {
const [searchImg, setSearchImg] = useState('')

const handleChange = event => {
  setSearchImg(event.target.value);
  }

const handleSearchSubmit = event => {
    event.preventDefault();

    handleSubmitForm(searchImg);
    event.currentTarget.reset();
  }

    return (
      <header className={css.Searchbar}>
  <form onSubmit={handleSearchSubmit} className={css.SearchForm}>
    <button type="submit" className={css.SearchForm_button}>
      <span>&#128269;</span> 
    </button>

    <input
      type="text"
      name="searchImg"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={handleChange}
      className={css.SearchForm_input}
    />
  </form>
</header>
    )
}
