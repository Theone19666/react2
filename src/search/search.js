import React, { Component } from "react";
import "./search.css";
import SearchInput from "../search-input";
import CardBlock from "../card-block";
import { Pagination, Spin, Alert } from "antd";

export default class Search extends Component {
  render() {
    const {
      movies,
      loading,
      error,
      genres,
      total,
      onPaginationChange,
      page,
      onSearch,
    } = this.props;
    const load = loading ? (
      <Spin size="large" className="loader-wrapper" />
    ) : null;
    const errorHtml = error ? (
      <Alert message="Произошла ошибка при загрузке данных" type="error" />
    ) : null;
    const moviesNotFound =
      !movies.length && !loading ? (
        <Alert message="По Вашему запросу ничего не найдено" type="success" />
      ) : null;
    const content =
      !loading && !error && movies.length ? (
        <Content
          movies={movies}
          genres={genres}
          total={total}
          onPaginationChange={onPaginationChange}
          page={page}
          onSearch={onSearch}
        />
      ) : null;
    return (
      <div className="search">
        <SearchInput
          placeholder="Type to search..."
          size="large"
          className="search__search-input"
          onInput={onSearch}
        />
        {load}
        {errorHtml}
        {moviesNotFound}
        {content}
      </div>
    );
  }
}

const Content = ({
  movies,
  genres,
  total,
  onPaginationChange,
  page,
  onSearch,
}) => {
  const moviesHtml = movies.map((item, index) => {
    const genresNames = item.genre_ids.map((id) => {
      return genres.find((genre) => genre.id === id)?.name;
    });
    return (
      <CardBlock
        key={item.id}
        genres={genresNames}
        {...item}
        className="movies__card"
      />
    );
  });
  return (
    <React.Fragment>
      <div className="movies">{moviesHtml}</div>
      {movies.length && (
        <Pagination
          defaultPageSize={20}
          total={total}
          className="search__pagination"
          onChange={onPaginationChange}
          current={page}
          showSizeChanger={false}
        />
      )}
    </React.Fragment>
  );
};
