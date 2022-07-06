import UploadBox from './UploadBox';
import { useState } from 'react';

function FileSelect() {
  const [fileCount, setFileCount] = useState(0);
  const [files, setFiles] = useState([]);

  // Add files to the state array
  function handleFileChange(e) {
    let count = fileCount;
    for (let i = 0; i < e.target.files.length; i++) {
      count++;
      e.target.files[i].key = e.target.files[i].name + count;
    }

    setFileCount(fileCount + count);
    setFiles(current => [...current, ...e.target.files]);
    console.log(e.target.files);
  }

  // Make a fetch request to upload each new file
/*  useEffect(() => {
      const baseUrl = `${document.location.protocol}//${document.location.host}`;
    files.forEach(file => {
      // Size check
      if (file.size > 20000000) {
        updateUpload(
          file.index,
          {
            ...uploads[file.index],
            isTooLarge: true,
            failure: true
          }
        );
        return false;
      }

      // POST request
      let formData = new FormData();
      formData.append('upload', file);

      fetch(`${baseUrl}/upload`, {
        method: 'POST',
        credentials: 'same-origin',
        body: formData
      }).then(response => response.json()
      ).then(json => {
        // Success
        const fileUrl = baseUrl + json.fileUrl;
        updateUpload(
          file.index,
          {
            ...uploads[file.index],
            url: fileUrl,
            success: true
          }
        );
      }).catch(error => {
        // Failure
        updateUpload(
          file.index,
          {
            ...uploads[file.index],
            failure: true
          }
        );
      });
    });
  }, uploads);
*/
  return (
    <div id="file-select" className="container">
      {/* SELECT BUTTON */}
      <label>
        <div id="select-button" className="is-size-3 is-unselectable">
          Select Files
        </div>
        <input
          type="file"
          name="upload"
          multiple
          onChange={handleFileChange}
        />
      </label>

      {/* UPLOAD BOXES */}
      <div className="columns is-multiline">
        {files.map((f) =>
          <UploadBox
            key={f.key}
            file={f}
          />
        )}
      </div>
    </div>
  )
}
  
export default FileSelect