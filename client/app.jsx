import React from 'react';
import EntryForm from './components/entryform';
import Static from './components/static';
import parseRoute from './lib/parse-route';
import RunnerList from './components/records';
import NavBar from './components/navbar';

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
      return <RunnerList runners={this.state.runners} />;
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
