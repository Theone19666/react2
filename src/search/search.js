import React, { Component } from "react";
import "./search.css";
import SearchInput from "../search-input";
import CardBlock from "../card-block";
import { Pagination, Spin, Alert } from "antd";

export default class Search extends Component {
  render() {
    const { movies, loading, error, genres } = this.props;
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
    const load = loading ? (
      <Spin size="large" className="loader-wrapper" />
    ) : null;
    const errorHtml = error ? (
      <Alert message="Произошла ошибка при загрузке данных" type="error" />
    ) : null;
    const content = !loading && !error ? <Content movies={moviesHtml} /> : null;
    return (
      <div className="search">
        {load}
        {errorHtml}
        {content}
      </div>
    );
    /*return (
      <div className="search">
        <SearchInput
          placeholder="Type to search..."
          size="large"
          className="search__search-input"
        />
        <div className="movies">{movies}</div>
        <Pagination
          defaultPageSize={6}
          total={this.props.movies.length}
          className="search__pagination"
        />
      </div>
    );*/
  }
}

const Content = ({ movies }) => {
  return (
    <React.Fragment>
      <SearchInput
        placeholder="Type to search..."
        size="large"
        className="search__search-input"
      />
      <div className="movies">{movies}</div>
      <Pagination
        defaultPageSize={6}
        total={movies.length}
        className="search__pagination"
      />
    </React.Fragment>
  );
};
