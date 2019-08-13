import React from "react";
import { Link } from "react-router-dom";

export default class AlbumUploadResults extends React.Component {
  render() {
    const { seals } = this.props;

    if (seals.length > 0) {
      return (
        <>
          <h2>Seals recorded, click on the links to view the seals images</h2>
          <ul className="list-group">
            {seals.map(seal => (
              <Link key={seals} className="list-group-item" to={seals}>
                {seals.toUpperCase()}
              </Link>
            ))}
          </ul>
        </>
      );
    }
    return <div />;
  }
}
