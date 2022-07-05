import UploadBox from './UploadBox';
import { useEffect, useState } from 'react';

function FileSelect() {
  function handleFileChange(e) {
    console.log(e);
  }

  let [uploads, setUploads] = useState([
    {
      name: "abc.jpg",
      isTooLarge: false,
      failure: false,
      success: false,
      url: "https://12svsdvswvwv3.com"
    },
    {
      name: "def.jpg",
      isTooLarge: false,
      failure: false,
      success: false,
      url: "https://12svsdvswvwv3.com"
    }
  ]);

  // Add an upload to the state array
  function addUpload(upload) {
    setUploads(current => [...current, upload]);
  }

  // Update an upload in the state array
  function updateUpload(index, newUpload) {
    setUploads(current =>
      current.map((upload, i) => {
        if (i == index) {
          return newUpload;
        } else {
          return upload;
        }
      })
    );
  }

  useEffect(() => {
    setTimeout(() => {
      updateUpload(0, {...uploads[0], success: true});
    }, 2000);
  }, []);

  return (
    <div id="file-select" className="container">
      {/* SELECT BUTTON */}
      <label>
        <div id="select-button" className="is-size-3 is-unselectable">
          Select Files
        </div>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
        />
      </label>

      {/* UPLOAD BOXES */}
      <div className="columns is-multiline">
        {uploads.map((u) =>
          <UploadBox
            key={u.name}
            name={u.name}
            url={u.url}
            isTooLarge={u.isTooLarge}
            success={u.success}
            failure={u.failure}
          />
        )}
      </div>
    </div>
  )
}
  
export default FileSelect