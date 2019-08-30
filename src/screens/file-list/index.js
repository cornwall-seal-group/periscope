import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl, harbourmasterApiKey } from "../../config.json";
import SubmissionBar from "../../components/submission-bar";

class FileList extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, files: [], selected: [] };
  }

  getBucketName = () => {
    return this.props.match.params.bucket;
  };

  getFolderName = () => {
    return this.props.match.params.folder || "originals";
  };

  componentDidMount() {
    const name = this.getBucketName();
    const folder = this.getFolderName();
    const options = {
      url: `${baseUrl}harbourmaster/api/v1/bucket/${name}/files/${folder}`,
      headers: {
        "x-api-key": harbourmasterApiKey
      }
    };
    Axios(options).then(({ data }) => {
      let files = data;
      if (!(data instanceof Array)) {
        files = [data];
      }
      this.setState({
        files,
        loading: false
      });
    });
  }

  clickedImage = ({ name }) => {
    const { selected } = this.state;

    if (selected.includes(name)) {
      const index = selected.indexOf(name);
      selected.splice(index, 1);
    } else {
      selected.push(name);
    }

    this.setState({ selected });
  };

  clearSelection = () => {
    this.setState({ selected: [] });
  };

  render() {
    const { files, loading, selected } = this.state;
    const bucket = this.getBucketName();
    const seal = bucket.toUpperCase();

    return (
      <>
        <h2 className="m-4">Seal - {seal}</h2>
        <Link to="/">Back to all seals</Link>
        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {!loading && files.length > 0 && (
          <div className="row">
            {files.map(file => (
              <div key={file.name} className="col col-4 mb-1">
                <img
                  style={{ width: "100%", cursor: "pointer" }}
                  className={
                    selected.includes(file.name) ? "image-selected" : ""
                  }
                  alt={file.name}
                  onClick={e => this.clickedImage({ name: file.name })}
                  src={`${baseUrl}minio-images/${bucket}/${file.name}`}
                />
              </div>
            ))}
          </div>
        )}
        <SubmissionBar
          selected={selected}
          clearSelection={this.clearSelection}
          seal={bucket}
        />
      </>
    );
  }
}

export default FileList;
