import React from "react";
import { Link } from "react-router-dom";
import { search, update } from "./BooksAPI";

class Search extends React.Component {
  state = {
    searchItems: []
  };
  onSelect = async (book, shelf) => {
    await update(book, shelf).then(book => {
      this.props.onAddNewBook(book);
    });
  };

  searchBooks = async query => {
    if (query.length > 1) {
      await search(query).then(items => {
        if (items) {
          this.setState({ searchItems: items });
        } else {
          this.setState({ searchItems: [] });
        }
      });
    } else if (query.length === 0) {
      this.setState({ searchItems: [] });
    }
  };

  renderImage = item => {
    if (!item.imageLinks) {
      return "";
    } else {
      return `url(${item.imageLinks.smallThumbnail})`;
    }
  };

  render() {
    console.log(this.state.searchItems)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.searchBooks(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchItems.length > 0 ? (
              this.state.searchItems.map(item => (
                <li key={item.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `${this.renderImage(item)}`
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select
                          onChange={e => this.onSelect(item, e.target.value)}
                          defaultValue={item.shelf}
                        >
                          <option value="none">None</option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">
                      <b>{item.title}</b>
                    </div>
                    <div className="book-title">
                      {item.subtitle ? item.subtitle : null}
                    </div>
                    {item.authors.map(author => (
                      <div className="book-authors" key={author}>
                        {author}
                      </div>
                    ))}
                  </div>
                </li>
              ))
            ) : (
              <p>No Books Found</p>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default Search;
