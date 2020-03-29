import React from 'react';
import axios from 'axios';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: '',
      imagePreviewUrl: null
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
     
      const fd = new FormData();
      fd.append('file',  this.state.selectedFile);

       fetch (
        'http://localhost:5000/predict', {
            method: 'POST',
            body: fd
        })
        .then(res => res.json())
        .then(result => console.log(result))


        // for testing
        // fetch (
        //   'http://localhost:5000/test', {
        //   })
        //   .then(res => res.json())
        //   .then(result => console.log(result))

  }

  render() {
    let imageStyle = {
        height: 200,
        width: 300,
        marginTop: 100
    }

    return (
        <div className="Main">
            <h1>RECTnet</h1>
            <div>
                <input type="file" onChange={this.fileSelectedHandler}/>
                <button onClick={this.fileUploadHandler}>Upload</button>
            </div>
            <div>
                 <img src={this.state.imagePreviewUrl} style={{...imageStyle}} />
            </div>
        </div>
    );
  }
}

export default Main;