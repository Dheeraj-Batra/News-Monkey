import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinnner from './Spinnner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category:'general'
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  // values which change dynamically are passed into constructor
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false
    }
    document.title=this.props.category
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7a668efdaee464a8252eb6fa1209adc&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    // JSON.parse() to convert the string into a JavaScript object:
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }
  async componentDidMount() {
    this.updateNews();
  }

  handleprevclick = async () => {
    this.setState({page:this.state.page-1});
    this.updateNews(); 
  }
  handlenextclick = async () => {
    this.setState({page:this.state.page+1});
    this.updateNews();
    }
  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey-Top Headlines</h2>
        {this.state.loading && <Spinnner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url} >
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} newsurl={
                element.url} author={(element.author)?element.author:"unknown"} date={element.publishedAt}/>
            </div>
          })};
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>&lrr; previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenextclick}>next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News