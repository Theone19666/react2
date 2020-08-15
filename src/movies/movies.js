import React, { Component } from "react";
import "./movies.css";
import CardBlock from "../card-block";
import { Pagination, Spin, Alert } from "antd";
import { MoviesConsumer } from "../movies-context";

export default class Movies extends Component {
  render() {
    const {
      movies,
      loading,
      error,
      total,
      onPaginationChange,
      page,
      rateMovie,
      questSessionId,
    } = this.props;
    //console.log("movies movies", movies);
    const load = loading ? (
      <Spin size="large" className="loader-wrapper" />
    ) : null;
    const errorHtml = error ? (
      <Alert message="Произошла ошибка при загрузке данных" type="error" />
    ) : null;
    const moviesNotFound =
      !movies?.length && !loading && !error ? (
        <Alert message="По Вашему запросу ничего не найдено" type="success" />
      ) : null;
    const content =
      !loading && !error && movies?.length ? (
        <MoviesConsumer>
          {({ genres }) => {
            return (
              <Content
                movies={movies}
                genres={genres}
                total={total}
                onPaginationChange={onPaginationChange}
                page={page}
                rateMovie={rateMovie}
                questSessionId={questSessionId}
              />
            );
          }}
        </MoviesConsumer>
      ) : null;
    return (
      <React.Fragment>
        {load}
        {errorHtml}
        {moviesNotFound}
        {content}
      </React.Fragment>
    );
  }
}

const Content = ({
  movies,
  genres,
  total,
  onPaginationChange,
  page,
  rateMovie,
  questSessionId,
}) => {
  const moviesHtml = movies.map((item, index) => {
    const genresNames = genres
      ? item.genre_ids?.map((id) => {
          return genres?.find((genre) => genre.id === id)?.name;
        })
      : [];
    return (
      <CardBlock
        key={item.id}
        genres={genresNames}
        {...item}
        className="movies__card"
        rateMovie={rateMovie}
        questSessionId={questSessionId}
      />
    );
  });
  return (
    <div className="movies-wrapper">
      <div className="movies">{moviesHtml}</div>
      {movies.length && (
        <Pagination
          defaultPageSize={20}
          total={total}
          className="movies__pagination"
          onChange={onPaginationChange}
          current={page}
          showSizeChanger={false}
        />
      )}
    </div>
  );
};
