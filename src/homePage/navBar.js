import React, { Component } from "react";

const NavBar = () => {
  return (
    <header role="banner">
      <nav role="navigation">
        <ul>
        <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/submit">Submissions</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;