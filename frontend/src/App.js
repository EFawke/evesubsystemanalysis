import './App.css';
import React from 'react';
import Header from './header'
import Heatmap from './heat-map'
import Info from './info'
import SearchDiv from './searchdiv'
import FauxHeader from './fauxheader';

class App extends React.Component {
  render() {
    return (
      <div className="background">
        <FauxHeader />
        <SearchDiv />
        <Heatmap shipSelected = {window.location.pathname.replace(/\//g,'')}/>
        <Info className ="info" shipSelected = {window.location.pathname.replace(/\//g,'')}/>
      </div>
    )
  }
}
export default App;
