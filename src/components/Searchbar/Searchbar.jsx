import React, { Component } from 'react';
import css from "./Searchbar.module.css";

export default class Searchbar extends Component {
 state = {
    searchImg: '',
}

  handleChange = event => {
    this.setState({
        searchImg: event.target.value,
    })
  }

  handleSearchSubmit = event => {
    event.preventDefault();
    
    const { searchImg } = this.state;
    this.props.handleSubmitForm(searchImg);

    event.currentTarget.reset();
  }

  render() {
    return (
      <header className={css.Searchbar}>
  <form onSubmit={this.handleSearchSubmit} className={css.SearchForm}>
    <button type="submit" className={css.SearchForm_button}>
      <span>&#128269;</span> 
    </button>

    <input
      type="text"
      name="searchImg"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={this.handleChange}
      className={css.SearchForm_input}
    />
  </form>
</header>
    )
  }
}
