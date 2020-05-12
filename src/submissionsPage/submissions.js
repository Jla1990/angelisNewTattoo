import React from "react";
import axios from "axios";

export default class Submissions extends React.Component {
  state = {
    sub: [],
  };
  //calls on API to display data
  componentDidMount() {
    axios
      .get("http://13.57.18.68/submission")
      .then((res) => {
        const sub = res.data;
        this.setState({ sub });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // handles voting functionality and sets state for upvotes in json
  vote(i) {
    let bestSubmission = [...this.state.sub];
    let id = bestSubmission[i].submission_id;
    bestSubmission[i].upvotes++;
    function swap(array, i, j) {
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;

    }
    axios
      .put("http://13.57.18.68/submission/" + id, {
        sub: bestSubmission,
      })
      .then((res) => {
        console.log("database was updated", res);
      })
    this.setState({
      sub: bestSubmission,

    });
  }
  onClick() {
    this.disabled = true;
  }


  render() {
    return (
      <div className="submissions-container">
        {this.state.sub.map((sub, i) => (
          <div className="submission" key={i} id={i}>
            <h1>{sub.idea_name}</h1>
            <p>
              <b>Tattoo Idea Description:</b> {sub.idea_desc}{" "}
            </p>
            <img src={sub.idea_image_url} />
            <p>
              <b>Submitted By: </b>
              {sub.submittor}
            </p>
            <div>
              <button id="voteButton" onClick={this.vote.bind(this, i)} votes={sub.upvotes}>Vote</button>
              <p>Number of votes: {sub.upvotes}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
