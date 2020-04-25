import React, { Component } from 'react'
import ReactDOM from 'react-dom';

class SubmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      tattooName: '',
      imageUrl: '',
      description: '',
    };
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  render() {
    let imgPreview;
    if (this.state.imageUrl) {
        imgPreview = <img src={this.state.imageUrl} alt='' />;
    }
    return (
      <form onSubmit={this.mySubmitHandler}>
      <h1>Hello {this.state.username}</h1>
      <p>Enter your name:</p>
      <input
        type='text'
        name='name'
        onChange={this.myChangeHandler}
      />
      <p>Tattoo Name:</p>
      <input
        type='text'
        name='tatooName'
        onChange={this.myChangeHandler}
      />
      <p>Tattoo Image Url:</p>
      <input
        type='url'
        name='imageUrl'
        onChange={this.myChangeHandler}
      />
      {imgPreview}

<p>Tattoo Description:</p>
      <textarea
        type='text'
        name='tatooName'
        onChange={this.myChangeHandler}
      />
      <br/>
      <br/>
      <input type='submit' />
      </form>
    );
  }
}
export default SubmissionForm;