import React, { Component } from "react";
import { Rate } from "antd";
import "./card-block.css";
import { format } from "date-fns";

function getVoteAverageClass(voteAverage = 0) {
  if (voteAverage >= 3 && voteAverage < 5) {
    return "card-block__vote-average-middle";
  }
  if (voteAverage >= 5 && voteAverage < 7) {
    return "card-block__vote-average-high";
  }
  if (voteAverage >= 7) {
    return "card-block__vote-average-highest";
  }
  return "";
}

export default class CardBlock extends Component {
  state = {
    rate: 0,
  };

  setMovieRate = (rate) => {
    //console.log("rate", rate);
    const { rateMovie, id } = this.props;
    rateMovie(rate, id).then(() => {
      this.setState({ rate });
    });
  };

  componentDidMount() {
    //  console.log("rating", rating);
    const { rating } = this.props;
    if (rating) {
      this.setState({ rate: rating });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.rating !== prevProps.rating) {
      this.setState({ rate: this.props.rating });
    }
  }

  render() {
    const {
      title,
      release_date,
      overview,
      vote_average,
      poster_path,
      genres,
      className,
    } = this.props;
    const genresButtons = genres.map((item, index) => {
      return (
        <div key={index.toString()} size="small" className="card-block__genre">
          {item}
        </div>
      );
    });
    const voteAverageClass = getVoteAverageClass(vote_average);
    return (
      <div className={`card-block ${className}`}>
        <img
          className="card-block__img"
          alt={title}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/original/${poster_path}`
              : ""
          }
        />

        <div className="card-block__description">
          <div className={`card-block__vote-average ${voteAverageClass}`}>
            {vote_average}
          </div>
          <h3 className="card-block__title">{title}</h3>
          <p className="card-block__date">
            {format(new Date(release_date), "MMMM d, Y")}
          </p>
          <div className="card-block__genres">{genresButtons}</div>
          <div className="card-block__overview">{overview}</div>
          <Rate
            allowHalf={true}
            count={10}
            className="card-block__rate"
            allowClear={false}
            onChange={this.setMovieRate}
            value={this.state.rate}
          />
        </div>
      </div>
    );
  }
}
