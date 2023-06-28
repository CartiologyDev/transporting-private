import React from "react";
import axios from "axios";
import "./styles.css";

export default class App extends React.Component {

  getStatus() {
    axios.get("/accountpage/workers").then((response) => {
      if (response.status === 200) {
        console.log(response.data)
      } else {
        console.log("Error")
      }
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.getStatus}>
          Click me!
        </button>
        <ul className="users">
            <p> статус    </p>
        </ul>
      </div>
    );
  }
}