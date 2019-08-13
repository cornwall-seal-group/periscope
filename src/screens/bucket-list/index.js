import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl, harbourmasterApiKey } from "../../config.json";

class BucketList extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, buckets: [] };
  }

  componentDidMount() {
    const options = {
      url: `${baseUrl}harbourmaster/api/v1/buckets`,
      headers: {
        "x-api-key": harbourmasterApiKey
      }
    };
    Axios(options).then(({ data: buckets }) => {
      this.setState({
        buckets,
        loading: false
      });
    });
  }

  render() {
    const { buckets, loading } = this.state;
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
            <ul className="list-group">
              {buckets.map(bucket => (
                <Link
                  key={bucket.name}
                  className="list-group-item"
                  to={`seal/${bucket.name}`}
                >
                  {bucket.name.toUpperCase()}
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
