import React from "react";
import { get, getAll, update, search } from "./BooksAPI";
import { Route } from "react-router-dom";
import Search from "./Search";
import Shelf from "./Shelf";
import "./App.css";

class App extends React.Component {
  state = {
    books: []
  };
  async componentDidMount() {
    await getAll().then(books => {
      this.setState({ books });
    });
  }
  addNewBook = books => {
      console.log("sssss", books)
    //   this.setState({books})
  }
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          component={() => <Shelf books={this.state.books} />}
        />
        <Route
          path="/search"
          component={({ history }) => <Search history={history} onAddNewBook={this.addNewBook}/>}
        />
      </div>
    );
  }
}

export default App;
