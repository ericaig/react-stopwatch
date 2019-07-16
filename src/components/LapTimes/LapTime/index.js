import React from 'react';
import '../../../components/LapTimes/LapTime/index.scss';

class LapTime extends React.Component {


    render() {
        return (
            <li className="lap-time-item">
                {this.props.lap.time}
                {this.props.lap.isFastest && <span className="time-def fastest-time">&nbsp;(Fastest)</span>}
                {this.props.lap.isSlowest && <span className="time-def slowest-time">&nbsp;(Slowest)</span>}
            </li>
        )
    }
}

export default LapTime