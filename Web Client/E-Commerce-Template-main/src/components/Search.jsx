import React, { useState } from "react";
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/api/products/filter/products?key=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        onSearch(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <form action="#" className="search" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          id="search"
          name="search"
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
          required
        />
        <label className="visually-hidden" htmlFor="search"></label>
        <button
          className="btn btn-primary text-white"
          type="submit"
          aria-label="Search"
        >
          <IconSearch />
        </button>
      </div>
    </form>
  );
};
export default Search;
