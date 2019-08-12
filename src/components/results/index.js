import React from "react";
import { baseUrl } from "../../config.json";

export default class Results extends React.Component {
  render() {
    const { results: data, fileName } = this.props;

    if (Object.keys(data).length === 0) {
      return (
        <div className="border border-info p-4 m-4">
          <span className="Title">Upload an image to see the results</span>
        </div>
      );
    }

    if (Object.keys(data.matches).length === 0) {
      return (
        <div className="border border-info p-4 m-4">
          <h1>We have failed to find a match, sorry</h1>
        </div>
      );
    }

    const firstItem = Object.keys(data.matches)[0];
    const folder = firstItem.split("/")[2];
    let aggregatedValues = {};
    Object.keys(data.matches).forEach(match => {
      Object.keys(data.matches[match]).forEach(sealId => {
        if (aggregatedValues.hasOwnProperty(sealId)) {
          aggregatedValues[sealId] =
            aggregatedValues[sealId] + data.matches[match][sealId];
        } else {
          aggregatedValues[sealId] = data.matches[match][sealId];
        }
      });
    });
    const numMatches = Object.keys(data.matches).length;

    if (numMatches > 1) {
      aggregatedValues = Object.keys(aggregatedValues).reduce(
        (current, value) => {
          current[value] = aggregatedValues[value] / numMatches;
          return current;
        },
        {}
      );
    }

    const sortedGuesses = Object.keys(aggregatedValues).sort(
      (a, b) => aggregatedValues[b] - aggregatedValues[a]
    );

    const bestGuess = sortedGuesses[Object.keys(sortedGuesses)[0]];

    return (
      <div className="border border-info p-4 m-4">
        <h1>Our Best Guess</h1>
        <p>The AI model predicts you've just seen:</p>
        <h2>
          {bestGuess}, with {(aggregatedValues[bestGuess] * 100).toFixed(2)}%
          accuracy
        </h2>
        <img
          alt="Your image"
          src={`${baseUrl}/guessed-images/${folder}/${fileName}`}
          className="w-100"
        />
        <hr />

        <h3>Patterns matched:</h3>
        {Object.keys(data.matches).map((match, index) => {
          return (
            <div id="accordion" className="accordion w-100 text-dark">
              <div className="card mb-0">
                <div
                  className="card-header collapsed"
                  data-toggle="collapse"
                  href={`#collapse${index}`}
                >
                  <a className="card-title">Image {index + 1}</a>
                </div>
                <div
                  id={`collapse${index}`}
                  className="card-body collapse"
                  data-parent="#accordion"
                >
                  <img
                    alt={match}
                    src={`${baseUrl}/${match.replace("../", "")}`}
                  />
                  <ul>
                    {Object.keys(data.matches[match])
                      .sort(
                        (a, b) =>
                          data.matches[match][b] - data.matches[match][a]
                      )
                      .map(prediction => {
                        const perc = (
                          data.matches[match][prediction] * 100
                        ).toFixed(2);
                        if (perc < 1) {
                          return "";
                        }
                        return (
                          <li>
                            {prediction}: {perc}%
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
