import React, { Component } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

export default class App extends Component {
  pageSize=15;
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          {/* <News pageSize={this.pageSize} country="in" category="science" /> */}
          <Routes>
            <Route path="/" element={<News pageSize={this.pageSize} key="general" country="in" category="general" />}></Route>

            <Route path="/business" element={<News pageSize={this.pageSize} key="business" country="in" category="business" />}></Route>

            <Route path="/entertainment" element={<News pageSize={this.pageSize} key="entertainment" country="in" category="entertainment" />}></Route>

            <Route path="/general" element={<News pageSize={this.pageSize} key="general" country="in" category="general" />}></Route>

            <Route path="/health" element={<News pageSize={this.pageSize} key="health" country="in" category="health" />}></Route>

            <Route path="/science" element={<News pageSize={this.pageSize} key="science" country="in" category="science" />}></Route>
            
            <Route path="/sports" element={<News pageSize={this.pageSize} key="sports" country="in" category="sports" />}></Route>

            <Route path="/technology" element={<News pageSize={this.pageSize} key="technology" country="in" category="technology" />}></Route>
          </Routes>
        </div>
      </Router>
    )
  }
}
