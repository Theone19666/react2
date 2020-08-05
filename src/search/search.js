import React, { Component } from "react";
import "./search.css";
import SearchInput from "../search-input";
import CardBlock from "../card-block";
import { Pagination } from "antd";

export default class Search extends Component {
  render() {
    const movies = this.props.movies.map((item, index) => {
      const genres = item.genre_ids.map((id) => {
        return this.props.genres.find((genre) => genre.id === id)?.name;
      });
      return (
        <CardBlock
          key={item.id}
          genres={genres}
          {...item}
          className="movies__card"
        />
      );
    });
    return (
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
    );
  }
}
