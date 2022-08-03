import React from 'react';

function Runner(props) {
  return (

    <li>
      <div className='row center'>
        <div className='single-runner'>
          <h3 className='rec-space'>Name: {props.runner.runnerName}</h3>
          <h3 className='rec-space'>Distance: {props.runner.distance}</h3>
          <h3 className='rec-space'>Finish Time: <span className='finish'>{props.runner.time}</span></h3>
        </div>
      </div>
    </li>
  );
}

function RunnerList(props) {
  return (
    <div className='container'>
    <ul>
      {
        props.runners.map(runner => {
          return <Runner key={runner.recordId} runner={runner} />;
        })
      }
    </ul>
    </div>
  );
}

export default RunnerList;
