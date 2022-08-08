import React from 'react';
import Modal from '../components/addmodal';

export default class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      distance: '',
      time: '',
      showResults: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  closeModal() {
    this.setState({
      showResults: false,
      name: '',
      distance: '',
      time: ''
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/records/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(() => {
        this.setState({ showResults: true });
      })
      .catch(err => err);
  }

  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <div className='entry'>
        <div className='row center'>
            <form className='col-90 form-pad' onSubmit={handleSubmit}>
              <div className='row flex-d'>
                <div className='col-33 marg-l'>
                  <label className='name-area'>Name
                  <input
                  required
                  name="name"
                  type="text"
                  value = {this.state.name}
                  onChange={handleChange}
                  className='name-input'
                  placeholder='Enter name here..' />
                  </label>
                </div>
                <div className='col-33 marg-lr'>
                <label className='distance-area'>Distance
                  <select required
                          name="distance"
                          onChange={handleChange}
                          value={this.state.distance}
                          className='distance-input'>
                    <option disabled hidden className='select-dist' value="">Select a distance..</option>
                    <option value='3200m'>3200m</option>
                    <option value='1600m'>1600m</option>
                    <option value='800m'>800m</option>
                  </select>
                </label>
                </div>
              <div className='col-33 marg-r'>
                <label className='time-area'>Finish Time
                  <input
                  required
                  name="time"
                  type="text"
                  value={this.state.time}
                  onChange={handleChange}
                  className='time-input'
                  placeholder='Enter time here..' />
                </label>
                </div>
              </div>
              <div className='row center'>
                <button type='submit' className='add'>
                  ADD THIS RECORD
                </button>
              </div>
            </form>
        </div>
        {this.state.showResults ? <Modal close={this.closeModal} /> : null}
      </div>
    );
  }
}
