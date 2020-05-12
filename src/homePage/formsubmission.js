import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import newId from "../utils/newId";

export default class SubmissionForm extends React.Component {
  state = {
    submission: false,
    id: newId(),
    name: "",
    tattooName: "",
    imageUrl: "",
    tattooDescription: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const submission = {
      id: newId(),
      name: this.state.name,
      tattooName: this.state.tattooName,
      imageUrl: this.state.imageUrl,
      tattooDescription: this.state.tattooDescription,
    };

    axios
      .post(`http://localhost:5000/submission`, { submission })
      .then((res) => {
        this.setState(() => ({
          submission: true,
        }));
      });
  };

  render() {
    if (this.state.submission === true) {
      return <Redirect to="/thank-you" />;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Make a submission</h1>
          <p>Enter your name:</p>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            required
          />
          <p>Tattoo Name:</p>
          <input type="text" name="tattooName" onChange={this.handleChange} />
          <p>Tattoo Image Url:</p>
          <input type="url" name="imageUrl" onChange={this.handleChange} />
          {/* {imgPreview} */}

          <p>Tattoo Description:</p>
          <textarea
            type="text"
            name="tattooDescription"
            onChange={this.handleChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
