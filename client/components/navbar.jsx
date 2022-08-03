import React from 'react';

export default class NavBar extends React.Component {

  render() {
    return (
      <div className='nav-bar'>
        <div className='nav'>
          <h1 className='logo inline'><a href=''>Citius</a></h1>
        <h3 className='records inline right'><a href="#records" onClick={this.props.get}>Records</a></h3>
        </div>
      </div>
    );
  }
}
