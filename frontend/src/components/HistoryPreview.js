import React, { Component } from 'react';
import { Container, Grid, Button } from '@material-ui/core';
import TimelineIcon from '@material-ui/icons/Timeline';


class HistoryPreview extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: []
        };
    }

    updateHistory = () => {
        var data = window.localStorage.getItem('emo-history');
        if (!!data) this.setState({data: JSON.parse(data)})
        console.log("Preview Component loaded")
        // console.log(JSON.parse(data))
    }

    componentDidMount() {
        this.updateHistory()
    }

    componentDidUpdate(prevProps) {
        if (this.props.hisCount !== prevProps.hisCount) this.updateHistory()
    }


    render() {
        var display;
        var hData = this.state.data;
        if (!this.state.data || this.state.data.length === 0) {
            display = <h3>No history</h3>
        } else {
            // console.log(typeof (hData[hData.length-1].time))
            display = <h3>Last time used {new Date(hData[hData.length-1].time).toTimeString() }</h3>
        }
        return (
            <div>
                <Container maxWidth="lg">
                    <Grid container spacing={3} justify='space-between'>
                        {display}
                        <Button disabled={!this.state.data}>
                            <TimelineIcon/> See full history
                        </Button>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default HistoryPreview;