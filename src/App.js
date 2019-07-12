import React, {useState} from 'react';
import './App.scss';

import Timer from './components/Timer/index';
import TimerButton from './components/TimerButton/index';

function App() {
  const [timerRunning, setTimerRunning] = useState(false);

  const startTimer = () =>{
    setTimerRunning(true)

  }

  const stopTimer = () =>{
    setTimerRunning(false)
  }

  const lapTimer = () => {
    console.log("lapTimer")
  }

  const resetTimer = () => {
    console.log("resetTimer")
  }

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

        <Timer timerRunning={timerRunning} />

        <div className="timer-btns-container">
          <TimerButton color="green" isVisible={!timerRunning} text="Start" onClick={startTimer} />
          <TimerButton color="red" isVisible={timerRunning} text="Stop" onClick={stopTimer} />
          {/*<TimerButton color="yellow" isVisible="true" text="Lap" onClick={lapTimer} />*/}
          <TimerButton color="blue" isVisible="true" text="Reset" onClick={resetTimer} />
        </div>
      </section>
    </div>
  ) 
}

export default App;
