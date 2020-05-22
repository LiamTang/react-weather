import React, { Component } from "react";
import "./searchBar.scss";

export class SearchBar extends Component {
  handleSubmit = () => {
    const newCity = this.cityInput.value.trim();
    this.props.callApi(newCity);
    this.cityInput.value = "";
  };

  render() {
    return (
      <div className="searchbar">
        <span>City: </span>
        <input type="text" ref={(input) => (this.cityInput = input)} />
        <button onClick={this.handleSubmit}>Change</button>
      </div>
    );
  }
}

export default SearchBar;
