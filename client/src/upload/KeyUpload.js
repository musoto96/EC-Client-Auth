import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import ECKey from  'ec-key';

export default function KeyUpload() {
  const [sig, setSig] = useState();

  const onDrop = useCallback(keyFileArray => {
    const uploadedKey = keyFileArray[0]
    console.log(uploadedKey);

    //if (uploadedKey.type !== "application/x-x509-ca-cert") {
      //console.log("Not a key");
      //console.log(uploadedKey.type);
      //setKey(uploadedKey);
    //} else {
      //console.log(uploadedKey.type);
      //console.log("Is key!");
      //setKey(uploadedKey);
    //};
    
    axios.get('/auth').then((document) => {
      const doc = document.data;
      console.log(doc);

      const reader = new FileReader();

      reader.readAsText(uploadedKey, 'UTF-8')
      reader.onload = () => {
        try {
          const eckey = new ECKey(reader.result);
          console.log(eckey);

          const signature = eckey.createSign('SHA512').update(doc).sign('base64');
          setSig(signature);
        } catch(error) {
          setSig();
          console.log(error);
        };
      };
    });

  }, []);

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  async function onSubmit(e) {
    console.log(sig);
    e.preventDefault();
    const formData = new FormData();
    formData.append('sig', sig);

    try {
      const res = await axios.post('/auth', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(res);
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmit} encType='multipart/form-data'>
      <div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
            <p>
              Drag and drop your private key, or click to browse from files.
            </p>
        </div>
        { sig ? <input type="submit" value="Login"/> : <br/> }
      </div>
    </form>
  );
};
