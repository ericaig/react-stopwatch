import React from 'react';
import LapTime from '../../components/LapTimes/LapTime/index';
import '../../components/LapTimes/index.scss';

class LapTimes extends React.Component {
    state = {
        items : [],
        delay: 100
    }

    interval;


    resetLapTimesState() {
        this.setState({
            items: [this.lapTimePureState()]
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.resetTimer) {
            this.resetLapTimesState();
            this.resetInterval();
        } else {
            if (this.props.timerRunning) {
                this.resetInterval();
                this.interval = setInterval(this.tick, this.state.delay);
            } else {
                this.resetInterval();
                //this.indicateFastestAndSlowestTimes()
            }
        }
    }

    componentWillUnmount() {
        this.resetInterval();
        //this.convertLapTimesToNumerical()
    }

    componentWillMount(){
        if (!this.state.items.length) {
            this.resetLapTimesState()
        }
    }

    componentWillUpdate(){
        if (this.props.newLapTime){
            this.props.setNewLapTimeCallback();

            //https://stackoverflow.com/a/35174579
            let stateCopy = Object.assign({}, this.state);
            stateCopy.items.push(this.lapTimePureState());
            this.setState(stateCopy);
        }
    }

    componentWillReceiveProps(curProps){
        if (!curProps.timerRunning) {
            this.recalculateItemsTotal()
        }
    }

    resetInterval() {
        if (!!this.interval) clearInterval(this.interval);
    }

    tick = () => {
        this.updateLastItem();
    }

    lapTimePureState(){
        return { hour: 0, minute: 0, second: 0, millisecond: 0, time: "00:00.00", isFastest: false, isSlowest: false, total: 0 };
    }

    recalculateItemsTotal(){
        if (this.state.items.length > 1){
            this.state.items.forEach(item => {
                item = this.calculateTotal(item)
            })
            this.indicateFastestAndSlowestTimes()
        }else{
            console.log("Can't set fastest or slowest. There's nothing to compare with...");
        }

        console.log("this.state.items", this.state.items);
    }

    /**
    * same as calculateTotal fnc but this uses item.time (00:00:00.0) value to calculate total
    * @deprecated 
    */
    calculateTotalUsingTimeKey(item){

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

        return item.total
    }


    /**
     * Converts hours and minutes to seconds and adds seconds and ms values to total.
     * @param `item` lap object.
     * @param radix A value between 2 and 36 that specifies the base of the number in numString.
     * @returns `item` with total key updated or added
     */
    calculateTotal(item){
        let total = 0;
        if (item.hour) total += item.hour * 3600;
        if (item.minute) total += item.minute * 60;
        if (item.second) total += item.second;
        if (item.millisecond) total += item.millisecond;

        item.total = total
        return item;
    }

    indicateFastestAndSlowestTimes(){
        if(!(this.state.items.length > 1)) return;

        let cur_min = -1;
        let cur_max = -1;


        this.state.items.forEach(item=>{
            if(cur_min === -1 || cur_min > item.total){
                cur_min = item.total;
            }

            if (cur_max === -1 || cur_max < item.total) {
                cur_max = item.total;
            }
        });

        this.state.items.forEach(item=>{
            item.isSlowest = item.total === cur_max;
            item.isFastest = item.total === cur_min;
        })
    }

    updateLastItem(){
        const items = this.state.items;
        const lastItemIndex = items.length - 1;
        let lastItem = items[lastItemIndex];
        lastItem = this.updateItemTimes(lastItem)
        //lastItem = this.calculateTotal(lastItem)

        console.log("lastItem", lastItem)

        //https://stackoverflow.com/a/35174579
        let stateCopy = Object.assign({}, this.state);
        stateCopy.items = stateCopy.items.slice();
        stateCopy.items[lastItemIndex] = Object.assign({}, lastItem);
        this.setState(stateCopy);
    }

    updateItemTimes(item){
        item.millisecond++;

        if(item.millisecond === 10){
            item.millisecond = 0;
            item.second++;

            if(item.second === 59){
                item.second = 0;
                item.minute++;
            }   
        }

        return item
    }

    render() {
        const items = this.state.items.map((lap, index) => <LapTime key={index+1} lap={lap} />)
        return (
            <div>
                {
                    this.state.items.length > 1 &&
                    <ol className="lap-times" reversed>
                        {items}
                    </ol>
                }
            </div>
        )
    }
}

export default LapTimes