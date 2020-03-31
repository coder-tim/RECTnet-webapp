import React from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: '',
      imagePreviewUrl: null,
      modelPredictionText: ''
    };
  }

  fileSelectedHandler = event => {
    // console.log(event.target.files[0]);
    //   this.setState({
    //       selectedFile: event.target.files[0]
    //   })

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

  fileUploadHandler = (event) => {
     
    if (this.state.selectedFile != '') {
      const fd = new FormData();
      fd.append('file',  this.state.selectedFile);

       fetch (
        '/predict', {
            method: 'POST',
            body: fd
        })
        .then(res => res.json())
        .then(result => this.setState({modelPredictionText: result.class_name}))       
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

    return (
        <div className="Main">
            <p style={{fontFamily: 'sans-serif', fontSize: 45}}>RECTnet</p>

            <div>

             <Button variant="contained" color="primary" component="label" style={{marginRight:30}}>
                Upload
                <input type="file" onChange={this.fileSelectedHandler} style={{ display: "none" }}/>
              </Button>

                {/* <input type="file" onChange={this.fileSelectedHandler}/> */}
  
              <Button onClick={this.fileUploadHandler} variant="contained" color="primary" component="span">
                Predict
              </Button>
            </div>

            <div>
                 <img src={this.state.imagePreviewUrl} style={{...imageStyle}} />
            </div>
            <div>
                <p style={{fontSize: 28}}>Predicted result:    {this.state.modelPredictionText}</p>
            </div>
        </div>
    );
  }
}

export default Main;