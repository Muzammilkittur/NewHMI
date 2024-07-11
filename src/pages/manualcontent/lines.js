import React, { useState } from 'react';

const StateBox = ({ name, color, x, y }) => (
  <React.Fragment>
    <rect x={x} y={y} width="100" height="50" fill={color} />
    <text x={x + 50} y={y + 30} fill="white" textAnchor="middle">{name}</text>
  </React.Fragment>
);

const StateDiagram = () => {
  const [currentState, setCurrentState] = useState('Idle');

  const statePositions = {
    'Idle': { x: 50, y: 50 },
    'Execute': { x: 200, y: 50 },
    'Aborting': { x: 350, y: 50 },
    'Aborted': { x: 350, y: 150 },
    'Resetting': { x: 50, y: 150 },
    'Stopped': { x: 200, y: 150 },
    'Clearing': { x: 350, y: 250 },
  };

  const stateColors = {
    'Idle': currentState === 'Idle' ? 'green' : 'blue',
    'Execute': currentState === 'Execute' ? 'green' : 'blue',
    'Aborting': currentState === 'Aborting' ? 'green' : 'blue',
    'Aborted': currentState === 'Aborted' ? 'green' : 'blue',
    'Resetting': currentState === 'Resetting' ? 'green' : 'blue',
    'Stopped': currentState === 'Stopped' ? 'green' : 'blue',
    'Clearing': currentState === 'Clearing' ? 'green' : 'blue',
  };

  return (
    <svg width="500" height="400">
      {Object.entries(statePositions).map(([name, position]) => (
        <StateBox key={name} name={name} color={stateColors[name]} x={position.x} y={position.y} />
      ))}
      
      {/* Lines connecting states */}
      <line x1="150" y1="75" x2="200" y2="75" stroke="black" />
      <line x1="300" y1="75" x2="350" y2="75" stroke="black" />
      <line x1="350" y1="100" x2="350" y2="150" stroke="black" />
      <line x1="350" y1="200" x2="350" y2="250" stroke="black" />
      <line x1="50" y1="100" x2="50" y2="150" stroke="black" />
      <line x1="200" y1="100" x2="200" y2="150" stroke="black" />
      <line x1="100" y1="75" x2="150" y2="75" strokeDasharray="4" />
      <line x1="250" y1="75" x2="300" y2="75" strokeDasharray="4" />
    </svg>
  );
};

export default StateDiagram;