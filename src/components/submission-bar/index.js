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
    const isAdmin = true; //window.location.hash.indexOf("admin=true") > 0;

    const num = selected.length;
    if (isAdmin) {
      return (
        <div className="row justify-content-between alert alert-primary bar py-2 m-0">
          {/* <button className="btn btn-danger" onClick={this.deleteImages}>
            Delete Images <span className="badge badge-light">{num}</span>
          </button> */}

          <div>
            <select id="classifier-tag" className="form-control">
              <option value="b221998c-0d8b-46de-b6f9-8561b13690c5">
                wet-head-left
              </option>
              <option value="36ad0cbd-0030-4cf8-8805-4f35be44f435">
                wet-head-right
              </option>
              <option value="9ed9eaad-43c8-4ac2-aa59-6c3f53b32f9f">
                wet-head-straight
              </option>
              <option value="7b62b8e3-21e2-42c6-8c2c-b1d88b4c4a07">
                bottling-right
              </option>
              <option value="93c56914-198b-49cc-ac76-3ff183c69740">
                bottling-left
              </option>
              <option value="9f8e9065-7eff-4df0-93f6-ad3e98fbccc6">
                bottling-straight
              </option>
              <option value="92bbe322-bb7e-465f-b120-2da93350eed2">
                wet-body-right
              </option>
              <option value="2dc4a497-e5d7-46c8-843c-6ff4387978e0">
                wet-body-left
              </option>
              <option value="826a4746-1595-4829-9d2c-8524b5b2e623">
                dry-head-left
              </option>
              <option value="55799bda-27d8-4c58-9f2c-811528845c58">
                dry-head-right
              </option>
              <option value="75dae3af-1c41-4952-a612-43dc4f7a42b0">
                dry-head-straight
              </option>
              <option value="99d2e491-aa7b-4f40-a398-b40186e53636">
                dry-body-right
              </option>
              <option value="77a3c4f5-5ae6-494f-97ba-5ef38622c3a2">
                dry-body-left
              </option>
            </select>
          </div>
          <button className="btn btn-info" onClick={this.sendImages}>
            Submit for body pose traning images{" "}
            <span className="badge badge-light">{num}</span>
          </button>
        </div>
      );
    }
    return <></>;
  }
}

export default SubmissionBar;
