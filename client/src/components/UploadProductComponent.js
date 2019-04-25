import React from 'react';
import ReactFileReader from 'react-file-reader';

const UploadProductComponent = (props) => {
  const { productAddImageLabel } = props;
  return (
    <div className="col input-field s12">
      <div className = "file-field input-field">
          <div className = "btn orange lighten-1">
             <ReactFileReader fileTypes={[".png",".jpg", ".jpeg"]} base64={true} multipleFiles={false} handleFiles={props.handleImageFile}>
             	<span>{productAddImageLabel}</span>
             </ReactFileReader>
          </div>
          
          <div className = "file-path-wrapper">
             <input className={props.imageClasses} type = "text"
                placeholder = "* Upload file // max file size 1MB" />
          </div>
       </div>
    </div>
  )
}

export default UploadProductComponent;