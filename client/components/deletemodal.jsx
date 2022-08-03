import React from 'react';

export default class DModal extends React.Component {
  render() {
    return (
      <div className='modal'>
        <div className='dmodal-cont'>
          <div className='dmsg-div'>
            <p>Are you sure you want to remove this record?</p>
          </div>
          <div className='dchoice-div row center'>
            <button className='r-button' onClick={this.props.delete}>REMOVE</button>
            <button className='c-button' onClick={this.props.close}>CANCEL</button>
          </div>
        </div>
      </div>
    );
  }
}
