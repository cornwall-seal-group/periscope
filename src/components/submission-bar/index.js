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
      this.setState({ tags: this.setTags(data), selectedTag: data[0] });
    });
  }

  setTags = tags => {
    tags.sort(function(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    tags.map(tag => {
      const split = tag.name.split("-");

      tag.name =
        split[0].toUpperCase() + " " + split[1] + " " + split[2].toUpperCase();
      return tag;
    });

    return tags;
  };

  onUpdateTagSelection = e => {
    this.setState({ selectedTag: e.target.value });
  };

  deleteImages = () => {
    const { selected } = this.props;
    console.log(selected);
  };

  sendImages = () => {
    const { seal, selected, clearSelection } = this.props;
    const { selectedTag } = this.state;
    const options = {
      method: "POST",
      url: `${remoteUrl}pelican/api/v1/pose/images`,
      headers: {
        "x-api-key": pelicanApiKey
      },
      data: {
        seal,
        images: selected,
        tag: selectedTag
      }
    };
    Axios(options).then(({ data }) => {
      this.setState({ tags: this.setTags(data) });
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
              onChange={this.onUpdateTagSelection}
            >
              {tags.map(tag => (
                <option value={tag.id}>
                  {tag.name} ({tag.imageCount})
                </option>
              ))}
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
