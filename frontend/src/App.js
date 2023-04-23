import './App.css';
import React from 'react';
import Heatmap from './heat-map'
import FauxHeader from './fauxheader';
import Selector from './selector';
import Graph from './graph';

class App extends React.Component {
  render() {
    return (
      <div className="background">
        <FauxHeader />
        <Heatmap shipSelected = {window.location.pathname.replace(/\//g,'')}/>
        <Graph/>
        <Selector/>
      </div>
    )
  }
}
export default App;
