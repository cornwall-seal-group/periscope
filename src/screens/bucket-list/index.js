import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl, harbourmasterApiKey } from "../../config.json";
import mappings from "../../mappings/mappings.json";

class BucketList extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, buckets: [], filter: "" };
  }

  componentDidMount() {
    const options = {
      url: `${baseUrl}harbourmaster/api/v1/buckets`,
      headers: {
        "x-api-key": harbourmasterApiKey
      }
    };
    Axios(options).then(({ data: buckets }) => {
      buckets.map(bucket => {
        let aliases = [];
        Object.keys(mappings).forEach(mapping => {
          if (
            mappings[mapping] !== mapping &&
            mappings[mapping] === bucket.name.toUpperCase()
          ) {
            aliases.push(mapping);
          }
        });
        bucket.aliases = aliases;
      });
      this.setState({
        buckets,
        loading: false
      });
    });
  }
  onFilter = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { buckets, loading, filter } = this.state;
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

        {!loading && buckets.length > 0 && (
          <>
            <h4 className="m-4">Pick a seal to view its images</h4>
            <input
              type="text"
              placeholder="Filter seals..."
              className="w-100 my-3 p-2"
              onKeyUp={this.onFilter}
            />
            <ul className="list-group">
              {buckets
                .filter(
                  bucket =>
                    bucket.name.toUpperCase().indexOf(filter.toUpperCase()) >
                      -1 ||
                    bucket.aliases.filter(
                      alias => alias.indexOf(filter.toUpperCase()) > -1
                    ).length > 0
                )
                .filter(
                  bucket => !ignoredFolders.includes(bucket.name.toUpperCase())
                )
                .map(bucket => (
                  <Link
                    key={bucket.name}
                    className="list-group-item d-flex justify-content-between"
                    to={`seal/${bucket.name}`}
                  >
                    <span className="text-left">
                      {bucket.name.toUpperCase()}
                    </span>
                    <span className="text-center aliases">
                      {bucket.aliases.join(",").toUpperCase()}
                    </span>
                    <span className="text-right">{bucket.files}</span>
                  </Link>
                ))}
            </ul>
          </>
        )}
      </>
    );
  }
}

export default BucketList;
