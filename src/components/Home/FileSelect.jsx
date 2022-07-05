import UploadBox from './UploadBox';

function FileSelect() {
  function handleFileChange(e) {
    console.log(e);
  }

  const fileObjects = [
    {
      fileName: "abc.jpg"
    },
    {
      fileName: "def.jpg"
    }
  ]

  return (
    <div id="file-select" className="container">
      {/* SELECT BUTTON */}
      <label>
        <div className="select-button is-size-3 is-unselectable">
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
        {fileObjects.map((f) =>
          <UploadBox
            key={f.fileName}
          />
        )}
      </div>
    </div>
  )
}
  
export default FileSelect