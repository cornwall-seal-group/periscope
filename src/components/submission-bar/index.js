import React, { Component } from "react";
import Axios from "axios";
import { remoteUrl, pelicanApiKey } from "../../config.json";
import "./submission-bar.css";

class SubmissionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      selectedTag: ""
    };
  }
  componentDidMount() {
    const options = {
      method: "GET",
      url: `${remoteUrl}pelican/api/v1/pose/tags`,
      headers: {
        "x-api-key": pelicanApiKey
      }
    };
    Axios(options).then(({ data }) => {
      console.log(data);
      this.setState({ tags: data, selectedTag: data[0] });
    });
  }

  onUpdateTagSelection = e => {
    console.log(e.target.value);
  };
  deleteImages = () => {
    const { selected } = this.props;
    console.log(selected);
  };

  sendImages = () => {
    const { seal, selected, clearSelection } = this.props;
    const options = {
      method: "POST",
      url: `${remoteUrl}pelican/api/v1/pose/images`,
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
      this.setState({ tags: data });
      clearSelection();
    });
  };

  render() {
    const { tags } = this.state;
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
            <select
              id="classifier-tag"
              className="form-control"
              onClick={this.onUpdateTagSelection}
            >
              {tags.map(tag => (
                <option value={tag.id}>
                  {tag.name} ({tag.imageCount})
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-info" onChange={() => this.sendImages}>
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
