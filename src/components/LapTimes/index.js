import React from 'react';
import LapTime from '../../components/LapTimes/LapTime/index';
import '../../components/LapTimes/index.scss';

class LapTimes extends React.Component {
    state = {
        items : [
            { time: "01:00.04", isFastest: false, isSlowest: false, total: 0 },
            { time: "05:03.07", isFastest: false, isSlowest: false, total: 0 },
            { time: "00:02.09", isFastest: false, isSlowest: false, total: 0 },
            { time: "00:25.05", isFastest: false, isSlowest: false, total: 0 },
            { time: "00:00.01", isFastest: false, isSlowest: false, total: 0 },
        ]
    }

    componentWillMount() {
        this.convertLapTimesToNumerical()
    }

    convertLapTimesToNumerical(){
        if (this.state.items.length > 1){
            this.state.items.forEach(item => {
                let itemSplit = item.time.split(':');
                itemSplit = itemSplit.concat(itemSplit[1].split('.'));
                itemSplit.splice(1, 1);
                item.total = 0;

                item.total = itemSplit.map((h_min_sec_mil, index) => {
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
            })

            this.indicateFastestAndSlowestTimes()
        }else{
            console.log("Can't set fastest or slowest. There's nothing to compare with...");
        }

        console.log("this.state.items", this.state.items);
    }

    indicateFastestAndSlowestTimes(){
        let cur_min = -1;
        let cur_max = -1;

        this.state.items.forEach(item=>{
            if(cur_min === -1 || cur_min > item.total){
                cur_min = item.total;
            }

            if (cur_max === -1 || cur_max < item.total) {
                cur_max = item.total;
            }

            return item.total
        });

        this.state.items.forEach(item=>{
            item.isSlowest = item.total === cur_max;
            item.isFastest = item.total === cur_min;
        })
    }

    render() {
        const items = this.state.items.map((lap, index) => <LapTime key={index+1} lap={lap} />)
        return (
            <div>
                <ol className="lap-times" reversed>
                    {items}
                </ol>
            </div>
        )
    }
}

export default LapTimes