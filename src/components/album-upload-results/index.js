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
            {Object.keys(seals).map(masterSeal => {
              return Object.keys(seals[masterSeal]).map(seal => (
                <li>
                  <Link
                    key={seal}
                    className="list-group-item d-flex justify-content-between"
                    to={`/seals/${masterSeal.toLowerCase()}`}
                  >
                    <span className="text-left">
                      {seal === masterSeal && masterSeal}
                      {seal !== masterSeal && `${seal} saved as ${masterSeal}`}
                    </span>

                    <span className="text-right">
                      {seals[masterSeal][seal]} Images
                    </span>
                  </Link>
                </li>
              ));
            })}
          </ul>
        </>
      );
    }
    return <div />;
  }
}
