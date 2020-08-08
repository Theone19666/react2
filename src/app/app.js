import React, { Component } from "react";
import { Tabs } from "antd";
import "./app.css";
import Search from "../search";
import Data from "../data";
import { debounce } from "lodash";

const { TabPane } = Tabs;

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    movies: [],
    genres: [],
    loading: true,
    error: false,
    page: 1,
    total: 0,
  };

  onPaginationChange = (page, pageSize) => {
    this.setState({ loading: true });
    const data = new Data();
    data
      .getMovies(page)
      .then((resp) => {
        this.setState({ movies: resp.results, loading: false, page });
      })
      .catch(() => this.setState({ error: true, loading: false }));
  };

  onSearch = (e) => {
    this.setState({ loading: true });
    const data = new Data();
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
    const data = new Data();
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
  }

  render() {
    const { movies, genres, loading, error, total, page } = this.state;
    return (
      <div className="wrapper">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Search" key="1">
            <Search
              movies={movies}
              genres={genres}
              loading={loading}
              error={error}
              total={total}
              onPaginationChange={this.onPaginationChange}
              page={page}
              onSearch={this.debounceEvent(this.onSearch, 1000)}
            />
          </TabPane>
          <TabPane tab="Rated" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
