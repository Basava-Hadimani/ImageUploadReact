


import  React from 'react';
import PropTypes from 'prop-types';

class ImageUploadInput extends  React.Component{
    constructor(props){
        super(props);
        this.state ={
            fileName: 'Choose File'
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {


        const target = event.currentTarget;

        console.log(target.files);

        if(target.name==='fileUpload'){
            console.log("handle change"+target.files[0].name);
            this.setState({
                fileName:target.files[0].name

            })
            this.props.onChange(event);
        }
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-2 form-group" style={styles.uploadButton}>
                    <FormGroup for={this.props.name}>
                        <label htmlFor={this.props.name}  className="wmsBorderedButton" style={{ paddingLeft: 30,paddingRight: 30}}>{this.props.uploadText}</label>
                        <input id={this.props.name}
                               name={this.props.name}
                               type="file"
                               accept={this.props.accept}
                               onChange={this.handleChange}
                               required={this.props.required}
                        />
                        <FieldFeedbacks for={this.props.name} className="form-control-feedback"
                                        style={styles.errorStyle}>
                            <FieldFeedback when="*"/>
                        </FieldFeedbacks>
                    </FormGroup>
                </div>
            </div>

        );
    }
}

ImageUploadInput.propTypes ={
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    uploadText: PropTypes.string.isRequired,
    fileTypeText: PropTypes.string.isRequired,
    accept: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
};

const styles = {

    lableStyle:{
        color:"#999",
        fontSize: 12
    },
    errorStyle:{
        fontSize: 11,
        overflow: "hidden"
    },
    uploadButton:{
        flexDirection: "column",
        display: "flex",
        overflow: "hidden",
        marginTop:20,
        marginLeft : 400
    }

};

export default ImageUploadInput;

