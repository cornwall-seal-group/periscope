import React from "react";
import { Route, HashRouter as Router, Link } from "react-router-dom";
import BucketList from "./screens/bucket-list";
import FileList from "./screens/file-list";
import AlbumUpload from "./screens/album-upload";
import ZipfileUpload from "./screens/zipfile-upload";
import "./App.css";

function App() {
  return (
    <Router basename="/periscope">
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <Link className="navbar-brand" to="/">
            <img
              src="periscope.jpg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            <span> Periscope - the Seal Viewer</span>
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 justify-content-end w-100">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/album-upload" className="nav-link">
                  Upload an Album
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/zipfile-upload" className="nav-link">
                  Upload a Zip
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main>
          <div className="section" id="index-banner">
            <div className="container-fluid">
              <div className="row">
                <div className="col s12 m12 xl12">
                  <Route exact path="/" component={BucketList} />
                  <Route path="/album-upload" component={AlbumUpload} />
                  <Route path="/zipfile-upload" component={ZipfileUpload} />
                  <Route path="/seal/:bucket" component={FileList} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
