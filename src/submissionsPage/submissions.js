import React from 'react';
import axios from 'axios';
import newId from '../utils/newId';


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
			sub.id = newId();		
		})
		.catch(error => {
		  console.log(error);
		});

		
		
	  }

	  constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	  }

	  onClick(e) {
		this.props.update(this.props.data.id);
	  }

  render() {

		return (
      <div className="submissions-container">
		{ this.state.sub.map(sub => 
		<div className="submission"  id={newId()}>
		<h1>{sub.idea_name}</h1>
		<p><b>Tattoo Idea Description:</b> {sub.idea_desc} </p>
		
      <img src={sub.idea_image_url}   />
  
		<p><b>Submitted By: </b>{sub.submittor}</p>
		<div className="vote">
		<button onClick={this.onClick}>Up</button>
			<p>{sub.upvotes}</p>
  </div>

	  </div>
		
		)}

    </div>
    )
  }
}

