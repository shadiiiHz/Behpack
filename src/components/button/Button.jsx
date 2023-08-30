import React from 'react'
import { Link } from 'react-router-dom';
import "./button.css"
const Button = ({ text, url }) => {
    return (
        <Link to={url}>
          <button className="btn">{text}</button>
        </Link>
      );
}

export default Button