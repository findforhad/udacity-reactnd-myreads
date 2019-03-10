import React from "react";
import { Link } from "react-router-dom";
import { update } from "./BooksAPI";

class Shelf extends React.Component {
  state = {
    books: this.props.books
  };

  shelfChange = async (shelf, book) => {
    await update(book, shelf).then(value => {
      console.log(typeof value);
      
    });
  };
  renderCurrentlyReading = books => {
    const currentlyReading = books.filter(b => b.shelf === "currentlyReading");
    if (currentlyReading) {
      return currentlyReading.map(b => (
        <li key={b.id}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${b.imageLinks.smallThumbnail})`
                }}
              />
              <div className="book-shelf-changer">
                <select
                  onChange={e => this.shelfChange(e.target.value, b)}
                  defaultValue={b.shelf}
                >
                  <option value="move" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{b.title}</div>
            {b.authors.map(author => (
              <div className="book-authors" key={author}>
                {author}
              </div>
            ))}
          </div>
        </li>
      ));
    }
  };

  renderWantToRead = books => {
    const wantToRead = books.filter(b => b.shelf === "wantToRead");
    if (wantToRead) {
      return wantToRead.map(b => (
        <li key={b.id}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${b.imageLinks.smallThumbnail})`
                }}
              />
              <div className="book-shelf-changer">
                <select
                  onChange={e => this.shelfChange(e.target.value, b)}
                  defaultValue={b.shelf}
                >
                  <option value="move" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{b.title}</div>
            {b.authors.map(author => (
              <div className="book-authors" key={author}>
                {author}
              </div>
            ))}
          </div>
        </li>
      ));
    }
  };

  renderRead = books => {
    const read = books.filter(b => b.shelf === "read");
    if (read) {
      return read.map(b => (
        <li key={b.id}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${b.imageLinks.smallThumbnail})`
                }}
              />
              <div className="book-shelf-changer">
                <select
                  onChange={e => this.shelfChange(e.target.value, b)}
                  defaultValue={b.shelf}
                >
                  <option value="move" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{b.title}</div>
            {b.authors.map(author => (
              <div className="book-authors" key={author}>
                {author}
              </div>
            ))}
          </div>
        </li>
      ));
    }
  };

  render() {
    const { books } = this.state;
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.renderCurrentlyReading(books)}
              </ol>
            </div>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Want to Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">{this.renderWantToRead(books)}</ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">{this.renderRead(books)}</ol>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" className="search-btn">
            Search
          </Link>
        </div>
      </div>
    );
  }
}

export default Shelf;
