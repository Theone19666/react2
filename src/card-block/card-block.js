import React from "react";
import { Card, Button, Rate } from "antd";
import "./card-block.css";
import { format } from "date-fns";

const { Meta } = Card;

function CardBlock(props) {
  const {
    title,
    release_date,
    overview,
    vote_average,
    poster_path,
    genres,
    className,
  } = props;
  const genresButtons = genres.map((item, index) => {
    return (
      <div key={index.toString()} size="small" className="card-block__genre">
        {item}
      </div>
    );
  });
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
        <div className="card-block__vote-average">{vote_average}</div>
        <h3 className="card-block__title">{title}</h3>
        <p className="card-block__date">
          {format(new Date(release_date), "MMMM d, Y")}
        </p>
        <div className="card-block__genres">{genresButtons}</div>
        <div className="card-block__overview">{overview}</div>
        <Rate
          allowHalf={true}
          disabled={true}
          count={10}
          value={vote_average}
          className="card-block__rate"
        />
      </div>
    </div>
  );
}

export default CardBlock;
