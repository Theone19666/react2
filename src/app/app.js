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
  };

  componentDidMount() {
    const data = new Data();
    data.getMovies().then((resp) => {
      this.setState({ movies: resp.results });
    });
    data.getGenres().then((resp) => {
      this.setState({ genres: resp.genres });
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Search" key="1">
            <Search movies={this.state.movies} genres={this.state.genres} />
          </TabPane>
          <TabPane tab="Rated" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
