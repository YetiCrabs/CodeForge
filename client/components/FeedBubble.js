import React, { Component } from 'react';

const FeedBubble = (props) => {
  return (
    <div className="feedBubble">
      <h2>{props.user}</h2>
      <h3>{props.status}</h3>
    </div>
  )
};

export default FeedBubble;