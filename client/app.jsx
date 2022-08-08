import React from 'react';
import EntryForm from './pages/entryform';
import Static from './components/static';
import parseRoute from './lib/parse-route';
import RunnerList from './pages/records';
import NavBar from './components/navbar';
import TopRunners from './pages/top-runners';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      runners: []
    };
    this.getRunners = this.getRunners.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    this.getRunners();
  }

  getRunners() {
    fetch('/api/records')
      .then(res => res.json())
      .then(result => this.setState({ runners: result }))
      .catch(err => err);
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <EntryForm />;
    }
    if (path === 'records') {
      return (
        <>
          <RunnerList runners={this.state.runners} get={this.getRunners} />;
          <div className='y-bar'><a href="#toprunners">VIEW RECORD HOLDERS</a></div>
        </>
      );
    }
    if (path === 'toprunners') {
      return (
        <TopRunners runners={this.state.runners} />
      );
    }
  }

  render() {

    return (
      <div>
        <Static>
        <NavBar get={this.getRunners} />
        { this.renderPage() }
        </Static>
      </div>
    );
  }
}
