import React, { Component } from "react";
import { Link } from "react-router-dom";

class SplashScreen extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-around pt-5">
          <Link
            className="col-4 p-3 splash-card card card-header"
            to={`buckets/originals`}
          >
            View original images
          </Link>
          <Link
            className="col-4 p-3 splash-card card card-header"
            to={`buckets/pd_5f1582f6-1663-4bcc-9a55-b8dd472bbb2b`}
          >
            View Images from pattern detection extraction
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
