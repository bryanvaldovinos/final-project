import React from 'react';
import {
  Chart,
  BarController,
  LinearScale,
  CategoryScale,
  BarElement
} from 'chart.js';

Chart.register(
  BarController,
  LinearScale,
  CategoryScale,
  BarElement
);

export default class OneGraph extends React.Component {
  constructor(props) {
    super(props);
    this.runChart = React.createRef();
    this.state = {
      event: '1600m'
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateGraph = this.updateGraph.bind(this);
  }

  handleChange(e) {
    this.chart.destroy();
    const { value } = e.target;
    this.setState({ event: value });
  }

  updateGraph() {
    const event = this.state.event;
    const eventRun = this.props.runners.filter(x => x.distance === event);
    const eventRunners = eventRun.map(el => {
      const timesplit = el.time.split(':');
      const runr = {
        name: el.runnerName,
        time: (Number(timesplit[0]) * 60) + Number(timesplit[1])
      };
      return runr;
    });
    const order = eventRunners.sort((a, b) => a.time - b.time);
    const topTen = order.slice(0, 10);
    const topNames = topTen.map(x => x.name);
    const topTimes = topTen.map(x => x.time);

    this.chart = new Chart(this.runChart.current, {
      type: 'bar',
      data: {
        labels: topNames,
        datasets: [{
          data: topTimes,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 2,
          barThickness: 20
        }]
      },
      options: {
        indexAxis: 'y'
      }
    });
    this.chart.render();

  }

  componentDidMount() {
    this.updateGraph();
  }

  componentDidUpdate(prevState) {
    if (this.state.event !== prevState.event) {
      this.updateGraph();
    }
  }

  render() {
    return (
      <div className='chart-cont'>
        <div className='chart-div'>
          <div className='top-r'>
          <h2 className='top-r inline'>TOP RECORD HOLDERS</h2>
          <canvas ref={this.runChart}></canvas>
          </div>

          <div className='rec-option'>
            <button className='rec-but' onClick={this.handleChange} value='3200m'>3200m</button>
            <button className='rec-but' onClick={this.handleChange} value='1600m'>1600m</button>
            <button className='rec-but' onClick={this.handleChange} value='800m'>800m</button>
          </div>

        </div>
      </div>
    );
  }

}
