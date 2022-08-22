import React from 'react';
import DModal from '../components/deletemodal';

class Runner extends React.Component {
  render() {
    return (
      <li>
        <div className='row center'>
          <div className='single-runner'>
            <h3 className='rec-space'>Name: {this.props.runner.runnerName}</h3>
            <h3 className='rec-space'>Distance: {this.props.runner.distance}</h3>
            <h3 className='rec-space'>Finish Time: <span className='finish'>{this.props.runner.time}</span></h3>
            <div className='row center'>
              <button className='delete' onClick={this.props.open} >REMOVE THIS RECORD</button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default class RunnerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      willDelete: null,
      isClicked: false
    };
    this.handleRClick = this.handleRClick.bind(this);
    this.closeRModal = this.closeRModal.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  handleRClick(runnerId) {
    this.setState({
      willDelete: runnerId,
      isClicked: !this.state.isClicked
    });
  }

  closeRModal() {
    this.setState({
      willDelete: null,
      isClicked: false
    });
  }

  deleteRecord() {
    const id = this.state.willDelete;
    fetch(`/api/records/${id}`, { method: 'DELETE' })
      .then(() => {
        this.props.get();
      })
      .catch(err => err);
    this.closeRModal();
  }

  render() {
    return (
      <div className='container'>
        <div>
          <ul>
            {
              this.props.runners.map(runner => {
                const handleClick = () => {
                  this.handleRClick(runner.recordId);
                };
                return <Runner key={runner.recordId}
                                runner={runner}
                                open={handleClick} />;
              })
            }
          </ul>
          {this.state.isClicked ? <DModal close={this.closeRModal} delete={this.deleteRecord}/> : null}
        </div>
      </div>
    );
  }
}
