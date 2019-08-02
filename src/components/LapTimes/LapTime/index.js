import React from 'react';
import '../../../components/LapTimes/LapTime/index.scss';

class LapTime extends React.Component {


    render() {
        return (
            <li className="lap-time-item">
                <span>{this.props.lap.minute > 9 ? `${this.props.lap.minute}` : `0${this.props.lap.minute}`}</span>
                <span>:</span>
                <span>{this.props.lap.second > 9 ? `${this.props.lap.second}` : `0${this.props.lap.second}`}</span>
                <span>.</span>
                <span>{this.props.lap.millisecond > 9 ? `${this.props.lap.millisecond}` : `0${this.props.lap.millisecond}`}</span>
                {this.props.lap.isFastest && <span className="time-def fastest-time">&nbsp;(Fastest)</span>}
                {this.props.lap.isSlowest && <span className="time-def slowest-time">&nbsp;(Slowest)</span>}
            </li>
        )
    }
}

export default LapTime