import React from 'react';

export default class Modal extends React.Component {
  render() {
    return (
      <div className='modal'>
            <div className='modal-content'>
              <div className='addmsg-div'>
                <p className='addmsg'>Your time has been added!</p>
              </div>
              <div className='runner-div'>
              <img className='runner' src="/images/runner.png" />
              </div>
              <div className='back-div'>
                <button className='backbtn' onClick={this.props.close}>BACK</button>
              </div>
            </div>
          </div>
    );
  }

}
