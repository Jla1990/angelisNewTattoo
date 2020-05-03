import React from 'react';
import axios from 'axios';

export default class SubmissionForm extends React.Component {
  state = {
    name: '',
    tattooName: '',
    imageUrl: '',
    tattooDescription: '',
  }

  handleChange = event => {
      console.log(event.target);
    this.setState({
        [event.target.name]: event.target.value,
      });

  }

  handleSubmit = event => {
    event.preventDefault();

    const submission = {
      name: this.state.name,
      tattooName: this.state.tattooName,
      imageUrl: this.state.imageUrl,
      tattooDescription: this.state.tattooDescription
    };

    axios.post(`http://localhost:5000/submission`, { submission })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    let imgPreview;
    if (this.state.imageUrl) {
        imgPreview = <img src={this.state.imageUrl} alt='your suggested tattoo' />;
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <h1>Make a submission</h1>
        <p>Enter your name:</p>
      <input
        type='text'
        name='name'
        onChange={this.handleChange}
      />
      <p>Tattoo Name:</p>
      <input
        type='text'
        name='tattooName'
        onChange={this.handleChange}
      />
      <p>Tattoo Image Url:</p>
      <input
        type='url'
        name='imageUrl'
        onChange={this.handleChange}
      />
      {imgPreview}

<p>Tattoo Description:</p>
      <textarea
        type='text'
        name='tattooDescription'
        onChange={this.handleChange}
      />

          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}
