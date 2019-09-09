import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import {
  remoteUrl,
  pelicanApiKey,
  harbourmasterUrl,
  harbourmasterApiKey
} from "../../config.json";
import sealAliases from "../../mappings/aliases.json";

class SealList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      seals: [],
      filter: "",
      tags: [],
      selectedTag: ""
    };
  }

  componentDidMount() {
    const options = {
      url: `${harbourmasterUrl}/api/v1/seals`,
      headers: {
        "x-api-key": harbourmasterApiKey
      }
    };
    Axios(options).then(({ data: seals }) => {
      Object.keys(seals).forEach(seal => {
        let aliases = [];
        if (seal in sealAliases) {
          aliases = sealAliases[seal];
        }
        seals[seal].aliases = aliases;
      });
      this.setState({
        seals,
        loading: false
      });
    });

    const tagOptions = {
      method: "GET",
      url: `${remoteUrl}pelican/api/v1/pose/tags`,
      headers: {
        "x-api-key": pelicanApiKey
      }
    };
    Axios(tagOptions).then(({ data }) => {
      this.setState({ tags: data });
    });
  }

  onFilter = e => {
    this.setState({ filter: e.target.value });
  };

  filterSealsByTag = (selectedTag = "") => {
    this.setState({ selectedTag });
  };

  render() {
    const { seals, loading, filter, tags, selectedTag = "" } = this.state;
    const ignoredFolders = ["ALBUMS", "ZIPFILES"];

    return (
      <>
        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {!loading && Object.keys(seals).length > 0 && (
          <>
            <h4 className="m-4">Pick a seal to view its images</h4>

            <div className="row">
              <div className="col col-12 centerfull my-2">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    key="all"
                    className={`btn btn-outline-info ${
                      selectedTag === "" ? "active" : ""
                    }`}
                    onClick={() => this.filterSealsByTag()}
                  >
                    All
                  </button>
                  {tags.map(tag => (
                    <button
                      type="button"
                      key={tag.name}
                      className={`btn btn-outline-info ${
                        selectedTag === tag.name ? "active" : ""
                      }`}
                      onClick={() => this.filterSealsByTag(tag.name)}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <input
              type="text"
              placeholder="Filter seals..."
              className="w-100 my-3 p-2"
              onKeyUp={this.onFilter}
            />
            <ul className="list-group">
              {Object.keys(seals)
                .filter(
                  seal =>
                    seal.toUpperCase().indexOf(filter.toUpperCase()) > -1 ||
                    seals[seal].aliases.filter(
                      alias => alias.indexOf(filter.toUpperCase()) > -1
                    ).length > 0
                )
                .filter(seal => !ignoredFolders.includes(seal.toUpperCase()))
                .filter(
                  seal => selectedTag === "" || selectedTag in seals[seal]
                )
                .map(seal => (
                  <Link
                    key={seal}
                    className="list-group-item d-flex justify-content-between"
                    to={`/seals/${seal}`}
                  >
                    <span className="text-left">{seal.toUpperCase()}</span>
                    <span className="text-center aliases">
                      {seals[seal].aliases.join(",").toUpperCase()}
                    </span>
                    <span className="text-right">
                      {selectedTag !== ""
                        ? seals[seal][selectedTag]
                        : seals[seal].total}
                    </span>
                  </Link>
                ))}
            </ul>
          </>
        )}
      </>
    );
  }
}

export default SealList;
