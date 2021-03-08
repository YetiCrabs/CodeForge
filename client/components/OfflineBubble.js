import React, { Component } from 'react';

const OfflineBubble = (props) => {
  return (
    <div className="offlineBubble">
      <h3>{props.user}</h3>
    </div>
  )
};

export default OfflineBubble;