import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import AlbumUploadResults from "../../components/album-upload-results";
import { harbourmasterUrl, harbourmasterApiKey } from "../../config.json";

class AlbumDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, results: [] };
  }

  getName = () => {
    return this.props.match.params.album;
  };

  componentDidMount() {
    const name = this.getName();
    const options = {
      url: `${harbourmasterUrl}/api/v1/albums/${name}`,
      headers: {
        "x-api-key": harbourmasterApiKey
      }
    };

    Axios(options).then(({ data }) => {
      this.setState({
        results: data,
        loading: false
      });
    });
  }

  render() {
    const { results, loading } = this.state;
    const album = this.getName();

    return (
      <>
        <h2 className="m-4">{album}</h2>
        <Link to="/albums">Back to all albums</Link>
        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {!loading && results && <AlbumUploadResults results={results} />}
      </>
    );
  }
}

export default AlbumDetails;
