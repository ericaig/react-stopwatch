import React from 'react';
import '../../components/Timer/index.css';

/*function Timer({timerRunning}){
    const [hour, setHour] = useState("00");
    const [minute, setMinute] = useState("00");
    const [second, setSecond] = useState("00");
    let [timerID, setTimerId] = useState();
    const [millisecond, setMilliSecond] = useState("00");
    let loopCounter = 0;

    const tick = () => {
        loopCounter++;
        setMilliSecond(loopCounter);

        if (loopCounter === 100) {
            loopCounter = 0;
            setSecond(second + 1);
        }
    }

    const Interval = {
        pause: (tid) => {
            if (tid > 0){
                clearInterval(tid);
                console.log("cleared interval", tid)
            }else{
                console.log("attempted to clear", tid)
            }
        },
        resume: () => {
            const tid = setInterval(() => { 
                loopCounter++;
                console.log("loopCounter", loopCounter);
                tick();

                if (loopCounter == 10)
                    clearInterval(tid);
            },100);

            console.log("initialized tid", tid)
            return tid
        },
        clear: ()=>{
            console.log("CLEAR");
        }
    };

    if (timerRunning){
        setTimerId(Interval.resume())
        console.log("starting timer", timerID);
    }else{
        Interval.pause(timerID);
        console.log("pausing timer", timerID);
    }

    useEffect(() => {
        // componentDidMount    
        return () => {
            // componentWillUnmount
            Interval.pause();
        }
    });

    return (
        <div className="timer">
            <span className="hour">{hour}</span>
            <span>:</span>
            <span className="minute">{minute}</span>
            <span>:</span>
            <span className="second">{second}</span>
            <span>.</span>
            <span className="millisecond">{millisecond > 9 ? `${millisecond}` : `0${millisecond}`}</span>
        </div>
    )
}*/

class Timer extends React.Component{
    state = {
        //hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        delay: 100
    };

    interval;

    componentDidMount(){

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.timerRunning){
            clearInterval(this.interval);
            this.interval = setInterval(this.tick, this.state.delay);
        }else{
            clearInterval(this.interval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick = () => {
        this.setState({
            millisecond: this.state.millisecond + 1
        });

        this.updateSeconds();
    }

    updateSeconds(){
        if (this.state.millisecond === 10) {
            this.setState({
                millisecond: 0,
                second: this.state.second + 1
            });

            this.updateMinutes();
        }
    }

    updateMinutes() {
        if (this.state.second === 59) {
            this.setState({
                second: 0,
                minute: this.state.minute + 1
            });
        }
    }

    render(){
        return (
            <div className="timer">
                {/*<span className="hour">{this.state.hour > 9 ? `${this.state.hour}` : `0${this.state.hour}`}</span>
                <span>:</span>*/}
                <span>{this.state.minute > 9 ? `${this.state.minute}` : `0${this.state.minute}`}</span>
                <span>:</span>
                <span>{this.state.second > 9 ? `${this.state.second}` : `0${this.state.second}`}</span>
                <span>.</span>
                <span>{this.state.millisecond > 9 ? `${this.state.millisecond}` : `0${this.state.millisecond}`}</span>
            </div>
        )
    }
}

export default Timer