import { useRef, Fragment } from 'react'

function UploadBox(props) {
  // Determine which message to show
  let uploadMsg = '';
  if (props.upload.isTooLarge) {
    uploadMsg = 'Error: file exceeds 20 MB.';
  } else if (props.upload.failure) {
    uploadMsg = 'Error uploading.';
  } else if (props.upload.success) {
    uploadMsg = 'Upload complete.';
  } else if (props.upload.name) {
    uploadMsg = 'Uploading...';
  }

  // Copy the URL to the clipboard
  const inputEl = useRef(null);
  function copyUrl() {
    inputEl.current.select();
    document.execCommand("copy");
  }

  return (
    <div className="column is-one-third">
      <div className="box upload-box">
        {/* FILE NAME */}
        <input
          type="text"
          className="upload-name is-size-5 has-text-black-bis"
          readOnly
          value="upload.name"
          ref={inputEl}
        />

        {/* UPLOAD MESSAGE */}
        <p className={`upload-message is-size-5 has-text-black-bis ${props.upload.failure ? failed : ''}`}>
          {uploadMsg}
        </p>

        {/* BUTTONS */}
        {!props.upload.failure &&
          <Fragment>
            <a
              role="button"
              href="props.upload.url"
              target="_blank"
              className="open-button is-primary is-outlined is-size-6 open-file"
            >
              Open File
            </a>
            <button
              className="button is-primary is-outlined is-size-6"
              onClick={copyUrl}
            >
              Copy Link
            </button>
          </Fragment>
        }
      </div>
    </div>
  )
}
  
export default UploadBox