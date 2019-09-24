import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { harbourmasterUrl, harbourmasterApiKey } from "../../config.json";

class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, ppts: [], filter: "" };
  }

  componentDidMount() {
    const options = {
      url: `${harbourmasterUrl}/api/v1/albums`,
      headers: {
        "x-api-key": harbourmasterApiKey
      }
    };
    Axios(options).then(({ data }) => {
      this.setState({
        ppts: data,
        loading: false
      });
    });
  }

  onFilter = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { ppts, loading, filter } = this.state;

    return (
      <>
        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {!loading && ppts.length > 0 && (
          <>
            <h4 className="m-4">Click to view the seals found in each album</h4>
            <input
              type="text"
              placeholder="Filter albums..."
              className="w-100 my-3 p-2"
              onKeyUp={this.onFilter}
            />
            <ul className="list-group">
              {ppts
                .filter(
                  ppt => ppt.toUpperCase().indexOf(filter.toUpperCase()) > -1
                )
                .map(ppt => (
                  <Link
                    key={ppt}
                    className="list-group-item list-group-item-action d-flex justify-content-between"
                    to={`/albums/${ppt}`}
                  >
                    {ppt}
                  </Link>
                ))}
            </ul>
          </>
        )}
      </>
    );
  }
}

export default AlbumList;
