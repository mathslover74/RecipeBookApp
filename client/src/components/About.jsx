import React from 'react';

const About = props => {
  const {params} = props.match
  return <h3>{params.id}</h3>
}

export default About