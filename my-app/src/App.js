import React, { useState } from 'react';
import axios from "axios";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  getStatus = () => {
    axios.get("/accountpage/workers").then((response) => {
      console.log(response);
      if (response.status === 200) {
        console.log(1)
        this.setState({ data: response.data });  // Set the response data in the component state
      }

    });
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <button onClick={this.getStatus}>
          Click me!
        </button>
        {Object.keys(data).map(key => (
          <div key={key}>
            <span>{key}</span>: <span>{data[key]}</span>
          </div>
        ))}

      </div>
    );
  }
}