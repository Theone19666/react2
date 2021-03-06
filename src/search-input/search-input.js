import React, { Component } from "react";
import { Input } from "antd";
import "./search-input.css";

const { Search } = Input;

export default class SearchInput extends Component {
  render() {
    const { className, ...props } = this.props;
    return <Input {...props} className={`search-input ${className}`} />;
  }
}
