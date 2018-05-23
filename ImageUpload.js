


import  React from 'react';
import UploadImage from '../UploadImage.js';
import ImageUploadInput from './ImageUploadInput';
import apiConstants from '../../../constants/api.js';
import axiosRequest from '../../../helper/request';
var FormData = require('form-data');


var ImageAdd = require('../../../../public/images/imageAdd.png');


let imageIndex = 0;
let imageArray = [];
let imageURL = [];

class ImageUpload extends React.Component {

	constructor(props) {
      super(props)
      this.state = {
      		isModalOpen: false,
      		image : [],
            fileUpload:{},
            comment : ''
       	}

       this.handleUpload = this.handleUpload.bind(this);  
    }
  	openModal() {
       this.setState({ isModalOpen: true })
	}

	closeModal() {
       let formData = new FormData();
       var errorFlag = false;

       (this.state.fileUpload).map((item, index)=>{


       formData.append('object', item);


        var invocation = new XMLHttpRequest();
        var url = 'http://YOUR/COMPLETE/URL'
        invocation.open('POST', url);
        invocation.onreadystatechange = function(){
            if(invocation.readyState === 4 && invocation.status === 200) {
                            let response = invocation.responseText;
                            let url = JSON.parse(response).fileurl;
                            imageURL.push(url.toString());
            }else{
                errorFlag = true;
            }
        };
        invocation.send(formData);

       })
       this.props.updateImageURL(imageURL);

       if(!errorFlag){
            this.setState({ isModalOpen: false });
       }else{
            alert("Can not upload images");
       }
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

        const target = event.currentTarget;
        if(target.name==='fileUpload'){
            this.setState({
                [target.name]:[...this.state.fileUpload, target.files[0]]

            })
        }else{
            this.setState({
                [target.name]: target.value
            });

        }
    }

  removeImage(event){
        
        let eventId = event.target.id;

        if(eventId){
            let imageNumber = eventId.slice(eventId.length - 1,eventId.length);

            let URL = this.state.fileUpload;

            imageArray.splice(imageNumber - 1, 1);
            URL.splice(imageNumber - 1, 1);

            imageIndex -= 1;

            this.setState({image: imageArray});
            this.setState({fileUpload : URL});
        }

  }

    componentWillUnmount(){
        imageIndex = 0;
        imageArray = [];
    }

    imageBlock(){

    	return Object.entries([...Array(8)]).map((item, index)=>{
    		index += 1;
    		let string = `image${index}`;
    		return (
    				    <div key={index} style={styles.removebuttonAlign}>
                        <img  style={styles.image} className={string} src={((imageIndex) === (index - 1))?ImageAdd:this.state.image[index - 1]}/>
                        {this.state.image[index - 1]?<button id={string} className="btn-link">Remove</button>:<p></p>}
                        </div>

    			)
    	})
   	}


   render() {


        console.log("URL",imageURL);    

      return (
        <div>
        	    <div>
                    <button className="btn-primary" onClick={() => this.openModal()}>Upload images</button>
                </div>

                <UploadImage isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                        <p><strong style={styles.textDesign}>{imageIndex?(imageIndex === 8)?<span style={styles.alertText}>Maximum images are selected!</span>:`You can upload ${8 - imageIndex} more images`:"You can upload maximum 8 images"}</strong></p>

                        <div style={styles.imageContainer} onClick={(event)=>{this.removeImage(event)}}>

                        {this.imageBlock()}

                        </div>

                        {(imageIndex === 8)?
                        	<div></div>
                        	:
                        	<ImageUploadInput
                            onChange={this.handleUpload}
                            label={"Attach Image"}
                            name={"fileUpload"}
                            required
                            uploadText={"Browse"}
                            fileTypeText="Image must be of PNG/JPG format"
                            accept=".jpg, .png"
                        	/>
                    	}


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
        width : 100,
		borderRadius : 20    
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
