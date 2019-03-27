import React, { Component } from "react";
import { Avatar, Button } from "antd";

class CustDetail extends Component {
  render() {
    return (
      <div>
        <Avatar size={64} icon="user" />{" "}
        <span>
          <h4>Customer Name</h4>
        </span>
        <br />
        <p>Email: </p>
        <p>Contact: </p>
        <p>Address:</p>
        <br />
      </div>
    );
  }
}

export default CustDetail;
