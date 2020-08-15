import React, { Component } from "react";
import Movies from "../movies";

import "./rated.css";

export default class Rated extends Component {
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

  setMovieRate = (rate = 0, id) => {
    const { questSessionId, rateMovie } = this.props;
    rateMovie({ questSession: questSessionId, movieId: id, rate })
      .then((resp) => {
        if (resp.success) {
          this.getMovies();
        } else {
          throw new Error("Запрос выполнился неудачно");
        }
      })
      .catch(() => this.setState({ error: true, loading: false }));
  };

  getMovies = () => {
    const { questSessionId, getMovies } = this.props;
    if (!questSessionId) {
      this.setState({ error: true, loading: false });
      return;
    }
    getMovies(questSessionId)
      .then((resp) => {
        this.setState({
          movies: resp.results,
          total: resp.total_results,
          loading: false,
          error: false,
        });
      })
      .catch(() => this.setState({ error: true, loading: false }));
  };

  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { movies, loading, error, total, page } = this.state;
    return (
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
    );
  }
}
