import React, { Component } from "react";

import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlipMove from "react-flip-move";

library.add(faTrash);

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentItem: { text: "", key: "" },
      itemList: [],
      updateText: ""
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdateText = this.handleUpdateText.bind(this);
  }

  handleOnChange(e) {
    this.setState({
      currentItem: { text: e.target.value, key: Date.now() }
    });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    this.setState({
      itemList: [...this.state.itemList, this.state.currentItem],
      currentItem: { text: "", key: "" }
    });
  }
  handleDelete(value) {
    return this.setState({
      itemList: [...this.state.itemList].filter(item => item.key !== value)
    });
  }
  handleUpdateText(e, k) {
    return this.setState({
      itemList: [...this.state.itemList].map(item => {
        if (item.key === k) {
          item.text = e.target.value;
        }
        return item;
      })
    });
  }

  handleListItems = () => {
    return [...this.state.itemList].map(item => (
      <div className="list" key={item.key}>
        <p>
          <input
            onChange={e => this.handleUpdateText(e, item.key)}
            type="text"
            value={item.text}
          />

          <span onClick={() => this.handleDelete(item.key)}>
            <FontAwesomeIcon className="faicons" icon="trash" />
          </span>
        </p>
      </div>
    ));
  };

  render() {
    return (
      <div className="App">
        <header>
          <form id="to-do-form" onSubmit={this.handleOnSubmit}>
            <input
              onChange={this.handleOnChange}
              value={this.state.currentItem.text}
              type="text"
              placeholder="Enter text"
            ></input>
            <button type="submit">Add</button>
          </form>
        </header>
        <FlipMove duration={300} easing="ease-in-out">
          {this.handleListItems()}
        </FlipMove>
      </div>
    );
  }
}

export default App;
