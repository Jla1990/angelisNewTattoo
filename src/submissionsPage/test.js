import React from 'react';
import axios from 'axios';

export default class Submissions extends React.Component {
  // State will apply to the posts object which is set to loading by default
  state = {
    submissions: [],
    isLoading: true,
    errors: null
  };
  // Now we're going to make a request for data using axios
  getSubmissions() {
    axios
      // This is where the data is hosted
      .get("http://localhost:5000/submission")
      // Once we get a response and store data, let's change the loading state
      .then(response => {
        this.setState({
          submissions: response.data.submissions,
          isLoading: false
        });
      })
      // If we catch any errors connecting, let's update accordingly
      .catch(error => this.setState({ error, isLoading: false }));
  }
  // Let's our app know we're ready to render the data
  componentDidMount() {
    this.getSubmissions();
    console.log(this.getSubmissions());
  }
  // Putting that data to use
  render() {
    const { isLoading, submissions } = this.state;
    return (
      <React.Fragment>
        <h2>Random Post</h2>
        <div>
          {/* {!isLoading ? (
            submissions.map(submission => {
              const { submittor, idea_name, idea_desc, idea_image_url } = submission;
              return (
                <div >
                  <h2>Tattoo Name: {idea_name}</h2>
                  <p>Name: {submittor}</p>
                  <p>Description: {idea_desc}</p>
                  <hr />
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )} */}
        </div>
      </React.Fragment>
    );
  }
}