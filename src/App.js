import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import BucketList from "./screens/bucket-list";
import FileList from "./screens/file-list";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <div className="section" id="index-banner">
            <div className="container-fluid">
              <div className="row">
                <div className="col s12 m12 xl12">
                  <Route exact path="/" component={BucketList} />
                  <Route path="/:bucket" component={FileList} />
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
