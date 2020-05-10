import React from 'react';
import axios from 'axios';

export default class Submissions extends React.Component {
	state = {
		sub: []
	  }
	

	componentDidMount() {
		axios.get('http://localhost:5000/submission')
		.then(res => {
			const sub = res.data;
			this.setState({ sub });
			console.log(sub);		
		})
		.catch(error => {
		  console.log(error);
		});
		
	  }

  render() {

    return (
      <div className="submissions-container">
		{ this.state.sub.map(sub => 
		<div className="submission" key={sub.self}>
		<h1>{sub.idea_name}</h1>
		<p><b>Tattoo Idea Description:</b> {sub.idea_desc} </p>
		
      <img src={sub.idea_image_url}   />
  
		<p><b>Submitted By: </b>{sub.submittor}</p>
	  </div>
		
		)}

    </div>
    )
  }
}
