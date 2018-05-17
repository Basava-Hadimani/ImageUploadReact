



import  React from 'react';
import UploadImage from '../UploadImage.js';
import ImageUploadInput from './ImageUploadInput';


//Image path down

var ImageAdd = require('../../../../public/images/imageAdd.png');


let imageIndex = 0;
let imageArray = [];

class ImageUpload extends React.Component {

	constructor(props) {
      super(props)
      this.state = {
      		isModalOpen: false,
      		image : []
       	}

       this.handleUpload = this.handleUpload.bind(this);  
    }
  	openModal() {
       this.setState({ isModalOpen: true })
	}

	closeModal() {
    	this.setState({ isModalOpen: false })
	}

handleUpload(event) {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                imageArray.push(e.target.result)
                imageIndex += 1;
                this.setState({image: imageArray});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

  removeImage(event){
        
        let eventId = event.target.id;
        let imageNumber = eventId.slice(eventId.length - 1,eventId.length);

        console.log(imageNumber);

        console.log(imageArray);

        imageArray.splice(imageNumber - 1, 1);

        console.log(imageArray);
        imageIndex -= 1;

        this.setState({image: imageArray});

  }

   render() {
      return (
        <div>
        	    <div>
                    <button className="btn-primary" onClick={() => this.openModal()}>Upload images</button>
                </div>

                <UploadImage isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                        <p><strong style={styles.textDesign}>{imageIndex?(imageIndex === 8)?<span style={styles.alertText}>Maximum images are selected!</span>:`You can upload ${8 - imageIndex} more images`:"You can upload maximum 8 images"}</strong></p>

                        <div style={styles.imageContainer} onClick={(event)=>{this.removeImage(event)}}>

                        <div style={styles.removebuttonAlign}>
                        <img ref='image' style={styles.image} className="image1" src={this.state.image[0]?this.state.image[0]:ImageAdd}/>
                        {this.state.image[0]?<button id="image1" className="btn-link">Remove</button>:<p></p>}
                        </div>

                        <div style={styles.removebuttonAlign}>
                        <img ref='image' style={styles.image} className="image2" src={((imageIndex) === 1)?ImageAdd:this.state.image[1]}/>
                        {this.state.image[1]?<button id="image2" className="btn-link" >Remove</button>:<p></p>}
                        </div>

                        </div>


                        <ImageUploadInput
                            onChange={this.handleUpload}
                            label={"Attach Image"}
                            name={"fileUpload"}
                            required
                            uploadText={"Browse"}
                            fileTypeText="Image must be of PNG/JPG format"
                            accept=".jpg, .png"
                        />


                        <p><button  className="col-md-2 form-group" style={styles.uploadbutton} onClick={() => this.closeModal()}><strong style={styles.uploadText}>Upload</strong></button></p>
                    </UploadImage>
        </div>
      );
   }
}

const styles = {
    uploadbutton:{
        flexDirection: "column",
        display: "flex",
        overflow: "hidden",
        marginTop:20,
        marginLeft : 380,
        border : "solid 1px #0099cc"
    },
    image : {
        display : "inline-block",
        height : 100,
        width : 100
    },
    uploadText : {
        marginLeft : 40
    },
    textDesign : {
        marginLeft : 360   
    },
    imageContainer : {
        marginLeft : 80,
        display : "flex",
        flexDirection : "row"
    },
    alertText : {
        color : "red"
    },
    removebuttonAlign : {
        display : "flex",
        flexDirection : "column"
    }
};


export default ImageUpload;
