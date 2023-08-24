import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";
export const uploadFileWithProgress = (file) => {
    return new Promise((resolve, reject) => {

        const storage = getStorage(app);
const filename=file.name;
const storageRef = ref(storage, 'images/' + filename);
const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle errors and reject the Promise
          reject(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log('File available at', downloadURL);
              resolve(downloadURL); // Resolve the Promise with the download URL
            })
            .catch((error) => {
              reject(error); // Reject the Promise in case of any error during getting the download URL
            });
        }
      );
    });
  };
  
  // Usage example:
 
  


// Upload file and metadata to the object 'images/mountains.jpg'
