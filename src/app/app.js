import React, { Component } from "react";
import { Tabs } from "antd";
import "./app.css";
import Search from "../search";
import Data from "../data";

const { TabPane } = Tabs;

export default class App extends Component {
  state = {
    movies: [],
    genres: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    const data = new Data();
    data
      .getMovies()
      .then((resp) => {
        this.setState({ movies: resp.results });
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
    const { movies, genres, loading, error } = this.state;
    return (
      <div className="wrapper">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Search" key="1">
            <Search
              movies={movies}
              genres={genres}
              loading={loading}
              error={error}
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
