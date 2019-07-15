import React from 'react';
import '../../components/Timer/index.css';
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
        if (this.props.resetTimer) {
            this.props.resetTimerCallback();
            this.setState({
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
            });
            this.resetInterval();
        }else{
            if (this.props.timerRunning) {
                this.resetInterval();
                this.interval = setInterval(this.tick, this.state.delay);
            } else {
                this.resetInterval();
            }
        }
    }

    componentWillUnmount() {
        this.resetInterval();
    }

    resetInterval(){
        if (!!this.interval) clearInterval(this.interval);
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