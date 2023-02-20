import { Component } from "react";
import Bookslist from "./components/Books/index.js";
import book from "./books.json";

import "./App.css";

localStorage.setItem("myData", JSON.stringify(book.Books));

class App extends Component {
  state = {
    searchInput: "",
    data: JSON.parse(localStorage.getItem("myData") || "[]"),
    newBookTitle: "",
    newBookAuthor: "",
    currentPage: 1,
    booksPerPage: 5,
  };

  onChangeSearchInput = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
  };

  onChangeAuthor = (event) => {
    this.setState({
      newBookAuthor: event.target.value,
    });
  };

  onChangeTitle = (event) => {
    this.setState({
      newBookTitle: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { data, newBookTitle, newBookAuthor } = this.state;
    const newBook = {
      uniqueNo: Math.random().toString(36).substr(2, 9),
      name: newBookTitle,
      author: newBookAuthor,
    };
    const updatedData = [...data, newBook];
    this.setState({
      data: updatedData,
      newBookTitle: "",
      newBookAuthor: "",
    });
    localStorage.setItem("myData", JSON.stringify(updatedData));
  };

  handlePageChange = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  deleteUser = (uniqueNo) => {
    const { data } = this.state;
    const filteredUsersData = data.filter((each) => each.uniqueNo !== uniqueNo);
    this.setState({
      data: filteredUsersData,
    });
  };

  render() {
    const {
      currentPage,
      booksPerPage,
      searchInput,
      data,
      newBookAuthor,
      newBookTitle,
    } = this.state;
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const filteredData = data.filter((book) =>
      book.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    const searchResults = filteredData.slice(indexOfFirstBook, indexOfLastBook);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / booksPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li key={number} id={number} onClick={this.handlePageChange}>
          {number}
        </li>
      );
    });

    return (
      <div className="app-container">
        <h1 className="title">Books List</h1>
        <input
          type="search"
          onChange={this.onChangeSearchInput}
          placeholder="Search for book"
          value={searchInput}
        />
        <ul className="list-container">
          {searchResults.map((eachUser) => (
            <Bookslist
              userDetails={eachUser}
              key={eachUser.uniqueNo}
              deleteUser={this.deleteUser}
            />
          ))}
        </ul>
        <div className="user-con">
          <h3 className="title">User Inputs</h3>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            value={newBookAuthor}
            className="input-field"
            placeholder="Enter Author name"
            onChange={this.onChangeAuthor}
          />{" "}
          <br />
          <input
            type="text"
            value={newBookTitle}
            className="input-field"
            placeholder="Enter Book Title"
            onChange={this.onChangeTitle}
          />{" "}
          <br />
          <button type="submit" className="button">Add</button>
        </form>
        </div>
        <ul id="page-numbers">{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default App;
