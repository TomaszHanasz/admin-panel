import React from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";

export default function UploadImage(props) {
  const { toast, onUpload, uploadProgress, image } = props;

  return (
    <div>
      <Toast ref={toast}></Toast>
      <div className="add-dish__right">
        <h3>Upload Image</h3>
        <FileUpload
          mode="basic"
          name="demo[]"
          accept="image/*"
          maxFileSize={10000000}
          multiple
          customUpload
          uploadHandler={onUpload}
          auto
          style={{ marginTop: 20 }}
        />
        {uploadProgress === 0 && (
          <div>Pick image and wait until upload finishes...</div>
        )}
        {uploadProgress > 0 && (
          <div>Upload Progress: {uploadProgress.toFixed(2)}%</div>
        )}
        {image && (
          <img
            src={image}
            className="add-dish__preview-img"
            alt="preview dish"
          />
        )}
      </div>
    </div>
  );
}
