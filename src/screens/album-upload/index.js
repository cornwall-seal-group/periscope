import React, { Component } from "react";
import Dropzone from "../../components/dropzone";
import "./upload.css";
import Progress from "../../components/progress";
import AlbumUploadResults from "../../components/album-upload-results";
import Axios from "axios";
import { albumParserUrl, apKey } from "../../config.json";

class AlbumUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      results: {},
      fileName: "",
      error: null
    };

    this.uploadFiles = this.uploadFiles.bind(this);
  }

  onFilesAdded = files => {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  };

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest = file => {
    const that = this;
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);

      Axios({
        method: "post",
        url: `${albumParserUrl}/api/v1/album/process`,
        data: formData,
        config: {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        headers: {
          "x-api-key": apKey
        }
      })
        .then(function(response) {
          that.setState({
            results: response.data,
            successfullUploaded: true,
            fileName: file.name,
            uploading: false,
            error: null
          });
        })
        .catch(function(response) {
          //handle error
          console.log(response);
          that.setState({
            successfullUploaded: false,
            error: response,
            uploading: false
          });
        });
    });
  };

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="check-circle.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions = () => {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({
              files: [],
              successfullUploaded: false,
              uploading: false
            })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-primary"
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  };

  render() {
    const {
      results,
      uploading,
      successfullUploaded,
      files,
      error
    } = this.state;

    return (
      <>
        <h1 className="text-info">Upload an Album</h1>
        <div className="border border-info p-4 m-4">
          <span className="Title">
            Add your PowerPoint album to be uploaded
          </span>
          <div className="Content">
            <div>
              <Dropzone
                onFilesAdded={this.onFilesAdded}
                disabled={uploading || successfullUploaded}
              />
            </div>
            <div className="Files">
              {files.map(file => {
                return (
                  <div key={file.name} className="Row">
                    <span className="Filename">{file.name}</span>
                    {this.renderProgress(file)}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Actions">{this.renderActions()}</div>
        </div>

        {uploading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="d-flex justify-content-center">
            <h3 className="text-danger">An error occurred</h3>
            <p>{error}</p>
          </div>
        )}

        <AlbumUploadResults results={results} />
      </>
    );
  }
}

export default AlbumUpload;
