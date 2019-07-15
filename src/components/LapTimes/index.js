import React from 'react';
import LapTime from '../../components/LapTimes/LapTime/index';
import '../../components/LapTimes/index.scss';

class LapTimes extends React.Component {
    items = [
        { time: "01:00.04", isFastest: false },
        { time: "00:02.09", isFastest: false },
        { time: "00:25.05", isFastest: false },
        { time: "05:03.07", isFastest: false },
        { time: "00:00.01", isFastest: false },
    ]

    componentDidMount() {
        this.convertLapTimesToNumerical()
    }

    convertLapTimesToNumerical(){
        //new Promise(resolve=>{
            this.items.map(item => {
                let itemSplit = item.time.split(':');
                itemSplit = itemSplit.concat(itemSplit[1].split('.'));
                itemSplit.splice(1, 1);
                item.total = 0;

                item.sum = itemSplit.map((h_min_sec_mil, index) => {
                    let calculated = parseInt(h_min_sec_mil);
                    if (itemSplit.length === 4 && index === 0) {
                        //w/ hr
                        calculated *= 3600;
                    } else if (itemSplit.length === 3 && index === 0) {
                        //without hr
                        calculated *= 60;
                    } else {
                        //calculated = self;
                    }
                    return calculated
                }).reduce((a, b) => a + b, 0); //used reduce to sum the values of array returned using .map(...)

                //resolve(itemSplit)
                return itemSplit;
            //});
        })
    }

    indicateFastestAndSlowestTimes(){
        /*this.items.map(item=>{

        })*/
    }

    render() {
        return (
            <div>
                <ol className="lap-times" reversed>
                    <LapTime />
                </ol>
            </div>
        )
    }
}

export default LapTimes