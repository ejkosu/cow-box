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