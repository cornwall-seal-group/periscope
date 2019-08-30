import React from "react";

import AlbumUploadResults from "../album-upload-results";

export default class BulkAlbumUploadResults extends React.Component {
  render() {
    const { results = [] } = this.props;

    if (results.length > 0) {
      return (
        <div className="card w-100">
          {results.map(result => (
            <>
              <h3>{result.ppt}</h3>
              <AlbumUploadResults results={result} />
            </>
          ))}
        </div>
      );
    }
    return <div />;
  }
}
