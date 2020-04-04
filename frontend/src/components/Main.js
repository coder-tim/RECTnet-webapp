import React from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Button from '@material-ui/core/Button';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: '',
      imagePreviewUrl: null,
      modelPredictionText: '',
      predictedResult: ''
    };
  }

  fileSelectedHandler = event => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0]

    reader.onloadend = () => {
        this.setState({
            selectedFile: file,
            imagePreviewUrl: reader.result
        })
    }
    reader.readAsDataURL(file);
  }

  predictHandler = (event) => {
     
    if (this.state.selectedFile !== '') {
      const fd = new FormData();
      fd.append('file',  this.state.selectedFile);

       fetch (
        '/predict', {
            method: 'POST',
            body: fd
        })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data = data.split('(').join('[');
          data = data.split(')').join(']');
          data = data.replace(/\'/g, '\"');
          let result = JSON.parse(data);
          this.setState({predictedResult: result})
        });      
    }
  }

  render() {
    let imageStyle = {
        height: 300,
        width: 450,
        marginTop: 50
    }

    const useStyles = makeStyles((theme) => ({
      root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      input: {
        display: 'none',
      },
    }));

    console.log('selectedFile' + this.state.selectedFile)

    return (
        <div className="Main">

            <p style={{fontFamily: 'sans-serif', fontSize: 45, color: '#696969'}}>RECTnet</p>
        
            <div> 

              <Button variant="contained" color="primary" component="label" style={{marginRight:30}}>
                Upload
                <input type="file" onChange={this.fileSelectedHandler} style={{ display: "none" }}/>
              </Button> 

              <Button onClick={this.predictHandler} variant="contained" color="primary" component="span">
                Predict
              </Button>
             </div> 

             <div>
                <p style={{fontFamily: 'sans-serif', fontSize: 20, color: '#696969'}}>Prediction:   
                {'   '}
                {this.state.predictedResult 
                  && this.state.predictedResult['faces']
                  && this.state.predictedResult['faces'][0]
                  && this.state.predictedResult['faces'][0]['class'].split(" ")[1]
                }</p>
            </div>

             <div>
                 <img src={this.state.imagePreviewUrl} style={{...imageStyle}} />
            </div> 
        </div>
    );
  }
}

export default Main;