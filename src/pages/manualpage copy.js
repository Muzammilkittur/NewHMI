import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [liftData, setLiftData] = useState({
    Mode: '',
    Indexer_enable: '',
    Indexer_fault: '',
    Indexer_Actual_Velocity: ''
  });

  const [botData, setBotData] = useState({
    enabledstatus: '',
    actualBot_velocity: '',
    actualBot_position: '',
    actualBot_current: '',
    actualBot_torque: ''
  });

  useEffect(() => {
    const fetchLiftData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/manual_indLift?number=1');
        const { Mode, Indexer_enable, Indexer_fault, Indexer_Actual_Velocity } = response.data;
        setLiftData({
          Mode,
          Indexer_enable,
          Indexer_fault,
          Indexer_Actual_Velocity
        });
      } catch (error) {
        console.error('Error fetching the lift data', error);
      }
    };

    const fetchBotData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/manual_bot_axis?bot=1&axis=X');
        const { enabledstatus, actualBot_velocity, actualBot_position, actualBot_current, actualBot_torque } = response.data;
        setBotData({
          enabledstatus,
          actualBot_velocity,
          actualBot_position,
          actualBot_current,
          actualBot_torque
        });
      } catch (error) {
        console.error('Error fetching the bot data', error);
      }
    };

    fetchLiftData();
    fetchBotData();

    const intervalId = setInterval(() => {
      fetchLiftData();
      fetchBotData();
    }, 100); // fetch every 100 milliseconds

    return () => clearInterval(intervalId); // cleanup on component unmount
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '50px' }}>
        <h1>Bot Axis Data</h1>
        <div>
          <label>Enabled Status: </label>
          <input type="text" value={botData.enabledstatus.toString()} readOnly />
        </div>
        <div>
          <label>Actual Bot Velocity: </label>
          <input type="text" value={botData.actualBot_velocity} readOnly />
        </div>
        <div>
          <label>Actual Bot Position: </label>
          <input type="text" value={botData.actualBot_position} readOnly />
        </div>
        <div>
          <label>Actual Bot Current: </label>
          <input type="text" value={botData.actualBot_current} readOnly />
        </div>
        <div>
          <label>Actual Bot Torque: </label>
          <input type="text" value={botData.actualBot_torque} readOnly />
        </div>
      </div>
      <div>
        <h1>Lift Position Data</h1>
        <div>
          <label>Mode: </label>
          <input type="text" value={liftData.Mode} readOnly />
        </div>
        <div>
          <label>Indexer Enable: </label>
          <input type="text" value={liftData.Indexer_enable.toString()} readOnly />
        </div>
        <div>
          <label>Indexer Fault: </label>
          <input type="text" value={liftData.Indexer_fault.toString()} readOnly />
        </div>
        <div>
          <label>Indexer Actual Velocity: </label>
          <input type="text" value={liftData.Indexer_Actual_Velocity} readOnly />
        </div>
      </div>
    </div>
  );
};

export default App;
