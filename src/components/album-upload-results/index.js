import React from "react";
import { Link } from "react-router-dom";

export default class AlbumUploadResults extends React.Component {
  render() {
    const { results = {} } = this.props;
    const seals = results["processed"] || {};

    if (Object.keys(seals).length > 0) {
      return (
        <>
          <h2>Seals recorded, click on the links to view the seals images</h2>
          <ul className="list-group">
            {Object.keys(seals).map(seal => (
              <li>
                <Link
                  key={seal}
                  className="list-group-item"
                  to={`/seal/${seals[seal].toLowerCase()}`}
                >
                  {seal.toUpperCase()} saved as {seals[seal].toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </>
      );
    }
    return <div />;
  }
}
