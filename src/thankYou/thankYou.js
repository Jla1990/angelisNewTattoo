import React, { Component } from "react";

const thankYouPage = () => {
  return (
    <div className="thank-you">
        <h1>Thank you! </h1>
        <h2>Your submission has been successful. </h2>
        <p>Enjoy this video of Angeli and then head over to the <a href="/submissions">submissions page </a>to check out her potential tattoo!</p>
        <div class="video-responsive">
        <iframe src='https://www.youtube.com/embed/FxlEeDyKxQY' frameborder='0' allowfullscreen></iframe>    </div>
    </div>

  );
};

export default thankYouPage;