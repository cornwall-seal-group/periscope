import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { harbourmasterUrl, harbourmasterApiKey } from "../../config.json";
import mappings from "../../mappings/mappings.json";

class SealList extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, seals: [], filter: "" };
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
        Object.keys(mappings).forEach(mapping => {
          if (
            mappings[mapping] !== mapping &&
            mappings[mapping] === seal.toUpperCase()
          ) {
            aliases.push(mapping);
          }
        });
        seals[seal].aliases = aliases;
      });
      this.setState({
        seals,
        loading: false
      });
    });
  }

  onFilter = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { seals, loading, filter } = this.state;
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
                    <span className="text-right">{seals[seal].total}</span>
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
