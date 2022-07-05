import UploadBox from './UploadBox';

function FileSelect() {
  function handleFileChange(e) {
    console.log(e);
  }

  const uploads = [
    {
      name: "abc.jpg",
      isTooLarge: false,
      failure: false,
      success: false
    },
    {
      name: "def.jpg",
      isTooLarge: false,
      failure: false,
      success: false
    }
  ]

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
            upload={u}
          />
        )}
      </div>
    </div>
  )
}
  
export default FileSelect