import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import {
  baseUrl,
  harbourmasterUrl,
  harbourmasterApiKey
} from "../../config.json";
import SubmissionBar from "../../components/submission-bar";

class FileList extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, folders: [], selected: [], filter: "" };
  }

  getSealName = () => {
    return this.props.match.params.seal;
  };

  componentDidMount() {
    const name = this.getSealName();
    const options = {
      url: `${harbourmasterUrl}/api/v1/seals/${name}`,
      headers: {
        "x-api-key": harbourmasterApiKey
      }
    };

    Axios(options).then(({ data }) => {
      this.setState({
        folders: data,
        loading: false
      });
    });
  }

  filterImages = (filter = "") => {
    console.log(filter);
    this.setState({ filter });
  };

  clickedImage = ({ name }) => {
    const { selected } = this.state;

    if (selected.includes(name)) {
      const index = selected.indexOf(name);
      selected.splice(index, 1);
    } else {
      selected.push(name);
    }
    console.log(selected);
    this.setState({ selected });
  };

  clearSelection = () => {
    this.setState({ selected: [] });
  };

  render() {
    const { folders, loading, selected, filter } = this.state;
    const sealName = this.getSealName();
    const seal = sealName.toUpperCase();

    return (
      <>
        <h2 className="m-4">Seal - {seal}</h2>
        <Link to="/seals">Back to all seals</Link>
        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {!loading && Object.keys(folders).length > 0 && (
          <>
            <div className="row">
              <div className="col col-12 centerfull">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    key="all"
                    className={`btn btn-info ${filter === "" ? "active" : ""}`}
                    onClick={() => this.filterImages()}
                  >
                    All
                  </button>
                  {Object.keys(folders).map(folder => (
                    <button
                      type="button"
                      key={folder}
                      className={`btn btn-info ${
                        filter === folder ? "active" : ""
                      }`}
                      onClick={() => this.filterImages(folder)}
                    >
                      {folder}{" "}
                      <span className="badge badge-info">
                        {folders[folder].length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="row">
              {Object.keys(folders)
                .filter(folder => filter === "" || folder === filter)
                .map(folder => {
                  return folders[folder].map(file => (
                    <div key={`${folder}/${file}`} className="col col-4 mb-1">
                      <img
                        style={{ width: "100%", cursor: "pointer" }}
                        className={
                          selected.includes(`${folder}/${file}`)
                            ? "image-selected"
                            : ""
                        }
                        alt={`${folder}/${file}`}
                        onClick={e =>
                          this.clickedImage({ name: `${folder}/${file}` })
                        }
                        src={`${baseUrl}minio-images/${sealName}/${folder}/${file}`}
                      />
                    </div>
                  ));
                })}
            </div>
          </>
        )}
        <SubmissionBar
          selected={selected}
          clearSelection={this.clearSelection}
          seal={sealName}
        />
      </>
    );
  }
}

export default FileList;
