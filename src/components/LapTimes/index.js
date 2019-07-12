import React from 'react';
import LapTime from '../../components/LapTimes/LapTime/index';
import '../../components/LapTimes/index.scss';

class LapTimes extends React.Component {

    render() {
        return (
            <div className="lap-times">
                lap times
                <LapTime/>
            </div>
        )
    }
}

export default LapTimes