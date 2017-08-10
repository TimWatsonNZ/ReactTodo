import React from "react";
import { render } from "react-dom";

class Button extends React.Component {
    render() {
        return <button>{this.props.text}</button>
    }
}

window.onload = () => {
    var root = document.createElement("div");
    root.id = "react-root";
    document.body.appendChild(root);

    render(<Button text="Hello, World!" />, root);
};