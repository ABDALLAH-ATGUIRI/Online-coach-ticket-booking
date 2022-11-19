import React, { Component } from "react";

class NaveItem extends Component {
  render() {
    return <li className="nav-item">{props.children}</li>;
  }
}

// const NaveItemDropDown = (props) => {
//     return <li className="nav-item dropdown">{props.children}</li>;

// };

export default { NaveItem, NaveItemDropDown };
