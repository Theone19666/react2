import React, { Component } from "react";
import "./search.css";
import SearchInput from "../search-input";
import Movies from "../movies";
import { debounce } from "lodash";

export default class Search extends Component {
  state = {
    movies: [],
    loading: true,
    error: false,
    page: 1,
    total: 0,
  };

  onPaginationChange = (page, pageSize) => {
    this.setState({ loading: true });
    //data
    this.props
      .getMovies(page)
      .then((resp) => {
        this.setState({ movies: resp.results, loading: false, page });
      })
      .catch(() => this.setState({ error: true, loading: false }));
  };

  componentDidMount() {
    this.props
      .getMovies()
      .then((resp) => {
        this.setState({
          movies: resp.results,
          total: resp.total_results,
          loading: false,
        });
      })
      .catch(() => this.setState({ error: true, loading: false }));
  }

  onSearch = (e) => {
    this.setState({ loading: true });
    //data
    this.props
      .getMovies(1, e.target.value)
      .then((resp) => {
        this.setState({
          movies: resp.results,
          loading: false,
          page: this.state.page,
          total: resp.total_results,
        });
      })
      .catch(() => this.setState({ error: true, loading: false }));
  };

  setMovieRate = (rate = 0, id) => {
    const { questSessionId, rateMovie } = this.props;
    rateMovie({ questSession: questSessionId, movieId: id, rate })
      .then((resp) => {
        console.log("resp", resp);
        if (resp.success) {
          this.props.getMovies();
        } else {
          throw new Error("Запрос выполнился неудачно");
        }
      })
      .catch(() => this.setState({ error: true, loading: false }));
  };

  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args);
    return (e) => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }
  render() {
    const { movies, loading, error, total, page } = this.state;
    return (
      <div className="search">
        <SearchInput
          placeholder="Type to search..."
          size="large"
          className="search__search-input"
          onInput={this.debounceEvent(this.onSearch, 1000)}
        />
        <Movies
          movies={movies}
          genres={this.props.genres}
          loading={loading}
          error={error}
          total={total}
          onPaginationChange={this.onPaginationChange}
          page={page}
          rateMovie={this.setMovieRate}
          questSessionId={this.props.questSessionId}
        />
      </div>
    );
  }
}
