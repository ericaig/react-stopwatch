import React, {useState} from 'react';
import './App.scss';

import Timer from './components/Timer/index';
import TimerButton from './components/TimerButton/index';
import LapTimes from './components/LapTimes/index';

function App() {
  const [timerRunning, setTimerRunning] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [newLapTime, setNewLapTime] = useState(false);

  const startTimerFnc = () =>{
    setTimerRunning(true)

  }

  const stopTimerFnc = () =>{
    setTimerRunning(false)
  }

  const lapTimerFnc = () => {
    if(timerRunning) setNewLapTime(true)
    else console.log("Lap time can only be set when timer is running...")
  }

  const setNewLapTimeCallback = () => {
    setNewLapTime(false)
  }  

  const resetTimerFnc = () => { 
    setResetTimer(true)
  }

  const resetTimerCallback = ()=>{
    stopTimerFnc();
    setResetTimer(false);
  };

  return (
    <div className="App">
      <h3 className="header">
        ReactJS Stopwatch&nbsp;
        <a href="https://www.instagram.com/explore/tags/codechallengesolved/" rel="noopener noreferrer" target="_blank">
          <code>#codechallengesolved</code>
        </a>
      </h3>

      <section>
        {/*{timerRunning && <Timer timerRunning={timerRunning} />}*/}

        <Timer timerRunning={timerRunning} resetTimer={resetTimer} resetTimerCallback={resetTimerCallback} />

        <div className="timer-btns-container">
          <TimerButton color="green" isVisible={!timerRunning} text="Start" onClick={startTimerFnc} />
          <TimerButton color="red" isVisible={timerRunning} text="Stop" onClick={stopTimerFnc} />
          <TimerButton color="yellow" isVisible="true" text="Lap" onClick={lapTimerFnc} />
          <TimerButton color="blue" isVisible="true" text="Reset" onClick={resetTimerFnc} />
        </div>
      </section>

      <div className="row center-md laptimes-container">
        <div className="col-md-6">
          <div className="box laptimes-list">
            <h4>Laps</h4>
            <LapTimes timerRunning={timerRunning} resetTimer={resetTimer} setNewLapTimeCallback={setNewLapTimeCallback} newLapTime={newLapTime} />
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default App;
