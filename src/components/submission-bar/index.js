import React, { Component } from "react";
import Axios from "axios";
import { remoteUrl, pelicanApiKey } from "../../config.json";
import "./submission-bar.css";

class SubmissionBar extends Component {
  deleteImages = () => {
    const { selected } = this.props;
    console.log(selected);
  };

  sendImages = () => {
    const { seal, selected, clearSelection } = this.props;
    const options = {
      method: "POST",
      url: `${remoteUrl}pelican/api/v1/od/images`,
      headers: {
        "x-api-key": pelicanApiKey
      },
      data: {
        seal,
        images: selected
      }
    };
    Axios(options).then(({ data }) => {
      console.log(data);
      clearSelection();
    });
  };

  render() {
    const { selected = [] } = this.props;
    const num = selected.length;
    return (
      <div className="row justify-content-between alert alert-primary bar py-2">
        <button className="btn btn-danger" onClick={this.deleteImages}>
          Delete Images <span className="badge badge-light">{num}</span>
        </button>

        <button className="btn btn-info" onClick={this.sendImages}>
          Submit for body angle traning images{" "}
          <span className="badge badge-light">{num}</span>
        </button>
      </div>
    );
  }
}

export default SubmissionBar;
