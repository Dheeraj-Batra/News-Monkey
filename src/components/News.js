import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      page:1,
      loading: false
    }
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=f7a668efdaee464a8252eb6fa1209adc&pagesSize=20";
    let data = await fetch(url);
    // JSON.parse() to convert the string into a JavaScript object:
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles,
      totalResults:parsedData.totalResults
    })
  }

  handleprevclick=async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f7a668efdaee464a8252eb6fa1209adc&page=${this.state.page-1}&pagesSize=20`;
    let data = await fetch(url);
    // JSON.parse() to convert the string into a JavaScript object:
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page:this.state.page-1
    })
  }
  handlenextclick= async()=>{
    if(this.state.page+1>Math.ceil(this.state.totalResults/20)){

    }
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f7a668efdaee464a8252eb6fa1209adc&page=${this.state.page+1}&pagesSize=20`;
      let data = await fetch(url);
      // JSON.parse() to convert the string into a JavaScript object:
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page:this.state.page+1
      })
    }
  }
  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey-Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url} >
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} newsurl={
                element.url} />
            </div>
          })};
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>&lrr; previous</button>
          <button type="button" className="btn btn-dark" onClick={this.handlenextclick}>next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News