import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Loader from "./Loader";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    pageSize: 20,
    country: "in",
    category: "general",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      pageSize: this.props.pageSize,
      totalResults: 0,
    };
    document.title = `  ${this.capitalizeFirstChar(
      this.props.category
    )} - NewsMonkey`;
  }

  capitalizeFirstChar = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  loadData = async () => {
    // debugger;

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   articles:
    //     this.state.articles.length > 1
    //       ? this.state.articles.concat(parsedData.articles)
    //       : parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: !this.state.loading,
    // });
    // console.log(parsedData);

    console.log(this.state.page);

    // setTimeout(() => {
    //   this.setState({
    //     loading: !this.state.loading,
    //   });
    // }, 1000);
  };

  async componentDidMount() {
    this.props.setProgress(0);
    await this.loadData();
    this.props.setProgress(100);

    //this.intervalId = setInterval(this.loadData, 1000);
  }

  //======================Next button click=====================
  // handleNextClick = async () => {
  //   this.setState(
  //     { page: this.state.page + 1, loading: !this.state.loading },
  //     () => {
  //       this.loadData();
  //     }
  //   );
  // };

  //======================Prev button click=====================
  // handlePrevClick = () => {
  //   this.setState(
  //     { page: this.state.page - 1, loading: !this.state.loading },
  //     () => {
  //       this.loadData();
  //     }
  //   );
  // };

  fetchMoreData = () => {
    debugger;
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.loadData();
      }
    );
  };

  render() {
    return (
      <>
        <h1 className="text-center">
          NewsMonkey - Top {this.capitalizeFirstChar(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Loader />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loader />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItems
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author ? element.author : "unknown"}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
            disabled={this.state.page <= 1}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            disabled={
              Math.ceil(this.state.totalResults / this.state.pageSize) ===
                this.state.page || this.state.totalResults === 0
            }
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
