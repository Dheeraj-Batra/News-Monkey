import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles:[],
      loading: false
    }
  }

  async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=f7a668efdaee464a8252eb6fa1209adc";
    let data=await fetch(url);
    // JSON.parse() to convert the string into a JavaScript object:
    let parsedData=await data.json();
    this.setState({articles:parsedData.articles})
  }

  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey-Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url} >
              <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} newsurl={
                element.url} />
            </div>
          })}; 

        </div>
      </div>
    )
  }
}

export default News