import React, { Component } from "react";
import { Tabs } from "antd";
import "./app.css";
// import Search from "../search";
// import Rated from "../rated";
import Data from "../data";
import { MoviesProvider } from "../movies-context";
import { debounce } from "lodash";
import Movies from "../movies";
import SearchInput from "../search-input";

const { TabPane } = Tabs;

const APIKEY = "781e652b603061b14211cfcdf1e822ff";
const APIURL = "https://api.themoviedb.org/3";

const data = new Data({ apikey: APIKEY, apiurl: APIURL });

export default class App extends Component {
  state = {
    error: false,
    loading: false,
    questSessionId: "",
    genres: [],
    movies: [],
    ratedMovies: [],
    loadingMovies: true,
    errorMovies: false,
    pageMovies: 1,
    totalMovies: 0,
    loadingRatedMovies: true,
    errorRatedMovies: false,
    pageRatedMovies: 1,
    totalRatedMovies: 0,
  };

  componentDidMount() {
    data
      .createGuestSession()
      .then((resp) => {
        this.setState({ questSessionId: resp.guest_session_id });
        //return resp.guest_session_id;
      })
      /* .then((sessionId) => {
        return data.getRatedMovies(sessionId);
      })
      .then((resp) => {
        this.setState({
          ratedMovies: resp.results,
          totalRatedMovies: resp.total_results,
        });
      }) */
      .catch(() => this.setState({ errorMovies: true, loadingMovies: false }));

    data
      .getMovies()
      .then((resp) => {
        this.setState({
          movies: resp.results,
          totalMovies: resp.total_results,
        });
      })
      .catch(() => this.setState({ errorMovies: true, loadingMovies: false }));

    /*if (this.state.questSessionId) {
      data
        .getRatedMovies(this.state.questSessionId)
        .then((resp) => {
          this.setState({
            ratedMovies: resp.results,
            totalRatedMovies: resp.total_results,
          });
        })
        .catch(() =>
          this.setState({ errorRatedMovies: true, loadingRatedMovies: false }),
        );
    } */

    data
      .getGenres()
      .then((resp) => {
        this.setState({ genres: resp.genres, loadingMovies: false });
      })
      .catch(() => this.setState({ errorMovies: true, loadingMovies: false }));
  }

  onMoviesPaginationChange = (page, pageSize) => {
    this.setState({ loadingMovies: true });
    //data
    data
      .getMovies(page)
      .then((resp) => {
        this.setState({
          movies: resp.results,
          loadingMovies: false,
          pageMovies: page,
        });
      })
      .catch(() => this.setState({ errorMovies: true, loadingMovies: false }));
  };

  onRatedMoviesPaginationChange = (page, pageSize) => {
    this.setState({ loadingRatedMovies: true });
    //data
    data
      .getRatedMovies(this.state.questSessionId, page)
      .then((resp) => {
        this.setState({
          ratedMovies: resp.results,
          loadingRatedMovies: false,
          pageRatedMovies: page,
        });
      })
      .catch(() =>
        this.setState({ errorRatedMovies: true, loadingRatedMovies: false }),
      );
  };

  onSearch = (e) => {
    this.setState({ loadingMovies: true });
    data
      .getMovies(1, e.target.value)
      .then((resp) => {
        this.setState({
          movies: resp.results,
          loadingMovies: false,
          pageMovies: this.state.page,
          totalMovies: resp.total_results,
        });
      })
      .catch(() => this.setState({ errorMovies: true, loadingMovies: false }));
  };

  setMovieRate = (rate = 0, id) => {
    const { questSessionId } = this.state;
    return data
      .rateMovie({ questSession: questSessionId, movieId: id, rate })
      .then((resp) => {
        console.log("resp", resp);
        if (resp.success) {
          data
            .getRatedMovies(questSessionId)
            .then((resp) => {
              this.setState({
                ratedMovies: resp.results,
                totalRatedMovies: resp.total_results,
                loadingRatedMovies: false,
              });
              console.log(" resp.results", resp.results);
            })
            .catch(() =>
              this.setState({
                errorRatedMovies: true,
                loadingRatedMovies: false,
              }),
            );
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
  /* state = {
    movies: [],
    genres: [],
    loading: true,
    error: false,
    page: 1,
    total: 0,
  };

  onPaginationChange = (page, pageSize) => {
    this.setState({ loading: true });
    data
      .getMovies(page)
      .then((resp) => {
        this.setState({ movies: resp.results, loading: false, page });
      })
      .catch(() => this.setState({ error: true, loading: false }));
  };

  onSearch = (e) => {
    this.setState({ loading: true });
    data
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

  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args);
    return (e) => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }

  componentDidMount() {
    data
      .getMovies()
      .then((resp) => {
        this.setState({ movies: resp.results, total: resp.total_results });
      })
      .catch(() => this.setState({ error: true, loading: false }));
    data
      .getGenres()
      .then((resp) => {
        this.setState({ genres: resp.genres, loading: false });
      })
      .catch(() => this.setState({ error: true, loading: false }));
  } */

  render() {
    const {
      movies,
      genres,
      loadingMovies,
      errorMovies,
      totalMovies,
      pageMovies,
      questSessionId,
      ratedMovies,
      loadingRatedMovies,
      errorRatedMovies,
      totalRatedMovies,
      pageRatedMovies,
    } = this.state;
    return (
      <div className="wrapper">
        <MoviesProvider
          value={{
            genres: this.state.genres,
          }}
        >
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Search" key="1">
              <div className="search">
                <SearchInput
                  placeholder="Type to search..."
                  size="large"
                  className="search__search-input"
                  onInput={this.debounceEvent(this.onSearch, 1000)}
                />
                <Movies
                  movies={movies}
                  genres={genres}
                  loading={loadingMovies}
                  error={errorMovies}
                  total={totalMovies}
                  onPaginationChange={this.onMoviesPaginationChange}
                  page={pageMovies}
                  rateMovie={this.setMovieRate}
                  questSessionId={questSessionId}
                />
              </div>
            </TabPane>
            <TabPane tab="Rated" key="2">
              <Movies
                movies={ratedMovies}
                genres={genres}
                loading={loadingRatedMovies}
                error={errorRatedMovies}
                total={totalRatedMovies}
                onPaginationChange={this.onRatedMoviesPaginationChange}
                page={pageRatedMovies}
                rateMovie={this.setMovieRate}
                questSessionId={questSessionId}
              />
            </TabPane>
          </Tabs>
        </MoviesProvider>
      </div>
    );
  }
}
