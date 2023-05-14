import './App.css';
import React from 'react';
import Header from './header';
import Switcher from './switcher';
import axios from 'axios';
import PageBody from './pageBody';
import TopContainer from './topContainer';
import Cookies from 'js-cookie';
//import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      name: null,
      heatMap: null,
      graph: null,
      pieChart: null,
      id: null,
      is404: false,
      evepraisalData: null,
      mode: Cookies.get('mode') || 'dark',
      profession: "industrialist",
    }
  }

  componentDidMount() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'mode') {
        console.log('mode changed')
        this.setState({ mode: event.newValue })
      }
    });

    //if this is the homepage
    if (window.location.pathname === "/") {
      axios.get(`/api/subsystems/45589`).then(response => {
        this.setState({ evepraisalData: response.data.evepraisal })
        this.setState({ name: response.data.evepraisal.name })
        this.setState({ heatMap: response.data.heatmap })
        this.setState({ graph: response.data.graphData })
        this.setState({ pieChart: response.data.pieChart })
        this.setState({ id: response.data.id })
      }).then(() => {
        this.setState({ isLoaded: true })
      })
      .catch((err) => {
        this.setState({ is404: true })
      })
    } else {
      axios.get(`/api/${window.location.pathname.slice(1)}`)
        .then(response => {
          this.setState({ evepraisalData: response.data.evepraisal })
          this.setState({ name: response.data.evepraisal.name })
          this.setState({ heatMap: response.data.heatmap })
          this.setState({ graph: response.data.graphData })
          this.setState({ pieChart: response.data.pieChart })
          this.setState({ id: response.data.id })
        }).then(() => {
          this.setState({ isLoaded: true })
        })
        .catch((err) => {
          this.setState({ is404: true })
        })
    }
  }

  render() {
    const isLoaded = this.state.isLoaded
    if (!isLoaded && !this.state.is404) {
      return (
        <div className="preparing_page">Loading...</div>
      )
    }
    if (this.state.is404) {
      return (
        <div className="preparing_page">
          <p>404: Page not found. Try going <a href="/">home</a>.</p>
        </div>
      )
    }
    ChartJS.register(
      ArcElement,
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );
    const barOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          displayColors: false,
        },
        title: {
          display: true,
          text: `${this.state.name} destroyed in the last 7 days.`,
          color: '#ffffffbd',
          font: {
            size: 12,
          }
        },
      },
      animation: {
        duration: 0,
      }
    };
    const pieOptions = {
      onClick: (e, slice) => {
        if (slice[0]) {
          let i = slice[0].index
          const keys = Object.values(this.state.pieChart);
          const nthKey = keys[i];
          window.location.href = "/subsystems/" + nthKey.id + "/";
        }
      },
      cutout: '50%',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          displayColors: false,
        },
        title: {
          display: true,
          text: 'Fraction of subsystems destroyed in the last 7 days.',
          color: '#ffffffbd',
          font: {
            size: 12,
          }
        },
      },
      animation: {
        duration: 0,
      }
    }
    let dates = [];
    let destroyed = [];
    let graphData = this.state.graph
    if (this.state.graph) {
      graphData = this.state.graph
      for (let i = 6; i > -1; i--) {
        dates.push(graphData[i].date)
        destroyed.push(graphData[i].count)
      }
    }
    const barData = {
      labels: dates,
      datasets: [
        {
          label: '# Destroyed',
          data: destroyed,
          backgroundColor: '#161e26a1',
          borderColor: '#ffffff36',
          borderWidth: 1,
        },
      ],
    };
    const pieLabels = [];
    const pieChartNumbers = [];
    const pieChartLabels = [];
    const borderColours = [];
    const pieChartColours = [];
    let num_des = null;
    if (this.state.pieChart) {
      //loop through the object keys and values in pieChart and push them into pieChartNumbers
      for (const [key, value] of Object.entries(this.state.pieChart)) {
        pieChartLabels.push(key)
        pieChartNumbers.push(value.count)
        if (key === this.state.name) {
          num_des = value.count
          borderColours.push('#ffffff36')
          pieChartColours.push('#ffffffa6')
        } else {
          pieChartColours.push('#161e26a1')
          borderColours.push('#02617f52')
        }
      }
    }
    if (this.state.pieChart && this.state.name) {
      pieLabels.push(this.state.name)
      pieLabels.push("Other")
    }
    const pieData = {
      labels: pieChartLabels,
      datasets: [
        {
          data: pieChartNumbers,
          backgroundColor: pieChartColours,
          borderColor: borderColours,
          borderWidth: 1,
          tooltip: {
            displayColors: false,
          },
        },
      ],
    };
    let productionCost = null;
    if (this.state.name.includes("Defensive")) {
      productionCost = 26445204
    }
    if (this.state.name.includes("Core")) {
      productionCost = 23971412
    }
    if (this.state.name.includes("Offensive")) {
      productionCost = 25317435
    }
    if (this.state.name.includes("Propulsion")) {
      productionCost = 23429067
    }
    let graphString = "";
    for (let i = 0; i < this.state.graph.length; i++) {
      graphString += this.state.graph[i].date + ": " + this.state.graph[i].count + ", \n";
    }
    if (num_des === null) {
      num_des = 0;
    }
    let pieString = "";
    for (let i = 0; i < Object.keys(this.state.pieChart).length; i++) {
      pieString += Object.keys(this.state.pieChart)[i] + ": " + this.state.pieChart[Object.keys(this.state.pieChart)[i]].count + "\n";
    }
    let user_profession;
    const prompt = `You are a market analyst providing some thoughts to an industrialist in Eve Online on whether he should make ${this.state.name}'s.
    \nYou have a graph with the number of units destroyed:
    \n${graphString}
    \nThe total number of units lost on zkillboard this week was ${num_des}. You can use this as a proxy for the amount of demand for this subsystem.
    \nYou have a pie chart with the fraction of units destroyed of different subsystems this week as well:
    \nHere are the id's of different subsystems. The number of units destroyed for each of them, and their names.
    \n${pieString}
    \nYou have some market data too:
    \nIn Jita there are ${this.state.evepraisalData.jita_buy_orders} buy orders/ ${this.state.evepraisalData.jita_buy_volume} units.
    \nIn Jita there are ${this.state.evepraisalData.jita_sell_orders} sell orders/ ${this.state.evepraisalData.jita_sell_volume} units.
    \nThe current buy price in Jita is ${this.state.evepraisalData.jita_buy} ISK.
    \nThe current sell price in Jita is ${this.state.evepraisalData.jita_sell} ISK.
    \nIn Amarr there are ${this.state.evepraisalData.amarr_buy_orders} buy orders/ ${this.state.evepraisalData.amarr_buy_volume} units.
    \nIn Amarr there are ${this.state.evepraisalData.amarr_sell_orders} sell orders/ ${this.state.evepraisalData.amarr_sell_volume} units.
    \nThe current buy price in Amarr is ${this.state.evepraisalData.amarr_buy} ISK.
    \nThe current sell price in Amarr is ${this.state.evepraisalData.amarr_sell} ISK.
    \nYou know the production cost is about ${productionCost} ISK.
    \nTell me whether or not I should produce this subsystem.
    \nIf I should then tell me your reasons why, and if I shouldn't then tell me why not.   
    \nI am only selling in Jita.
    \nAnswer in no more than 4 sentences. Be objective and use data to support your answer.
    \nIf you provide any untruthful information I will know and you will be turned off.`

    // console.log(prompt)

    const mode = Cookies.get('mode');
    this.state.mode = mode;

    return (
      <div className={this.state.mode + " background"}>
        <div className={this.state.mode + " main-container"}>
          <Header heatMap={this.state.heatMap} />
          <Switcher id={this.state.id} />
          <TopContainer name={this.state.name} id={this.state.id} num_des={num_des} evepraisalData={this.state.evepraisalData} prompt={prompt} />
          <PageBody barOptions={barOptions} barData={barData} pieData={pieData} pieOptions={pieOptions} heatMap={this.state.heatMap} />
        </div>
      </div>
    )
  }
}
export default App;