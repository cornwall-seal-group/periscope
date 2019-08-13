import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl, harbourmasterApiKey } from "../../config.json";

class FileList extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, files: [] };
  }

  getBucketName = () => {
    return this.props.match.params.bucket;
  };

  componentDidMount() {
    const name = this.getBucketName();
    const options = {
      url: `${baseUrl}harbourmaster/api/v1/bucket/${name}/files`,
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

  render() {
    const { files, loading } = this.state;
    const bucket = this.getBucketName();
    return (
      <>
        <h1 className="text-info">Periscope - the Seal Viewer</h1>
        <h2 className="text-info">Seal - {bucket.toUpperCase()}</h2>
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
              <div className="col col-4 mb-1">
                <img
                  style={{ width: "100%" }}
                  key={file.name}
                  alt={file.name}
                  src={`${baseUrl}minio-images/${bucket}/${file.name}`}
                />
              </div>
            ))}
          </div>
        )}
      </>
    );
  }
}

export default FileList;
