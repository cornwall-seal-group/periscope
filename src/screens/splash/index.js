import React, { Component } from "react";
import { Link } from "react-router-dom";

class SplashScreen extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-around pt-5">
          <Link className="col-4 p-3 splash-card card card-header" to={`seals`}>
            View Seal Images
            <img
              alt="seal"
              src="head-right.svg"
              style={{ height: "100%", width: "100%" }}
            />
          </Link>
        </div>
        <div className="row justify-content-around pt-5">
          <Link
            className="col-4 p-3 splash-card card card-header"
            to={`album-upload`}
          >
            Upload an Album
          </Link>
          <Link
            className="col-4 p-3 splash-card card card-header"
            to={`bulk-album-upload`}
          >
            Upload a Zip file of albums
          </Link>
        </div>
        <div className="row justify-content-around pt-5">
          <Link
            className="col-4 p-3 splash-card card card-header"
            to={`zipfile-upload`}
          >
            Upload a Zip of folders of images
          </Link>
        </div>
      </div>
    );
  }
}

export default SplashScreen;
