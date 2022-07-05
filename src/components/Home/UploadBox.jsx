import { useRef, Fragment } from 'react'

function UploadBox(props) {
  // Determine which message to show
  let uploadMsg = '';
  if (props.isTooLarge) {
    uploadMsg = 'Error: file exceeds 20 MB.';
  } else if (props.failure) {
    uploadMsg = 'Error uploading.';
  } else if (props.success) {
    uploadMsg = 'Upload complete.';
  } else if (props.name) {
    uploadMsg = 'Uploading...';
  }

  // Copy the URL to the clipboard
  const urlRef = useRef(null);
  function copyUrl() {
    urlRef.current.select();
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
        />

        {/* UPLOAD MESSAGE */}
        <p className={`upload-message is-size-5 has-text-black-bis ${props.failure ? failed : ''}`}>
          {uploadMsg}
          {!props.failure && !props.success && 
            <progress className="progress is-small is-primary" />
          }
        </p>

        {/* BUTTONS */}
        {props.success &&
          <Fragment>
            <a
              role="button"
              href={props.url}
              target="_blank"
              className="open-button button is-primary is-outlined is-size-6"
            >
              Open File
            </a>
            <button
              className="button is-primary is-outlined is-size-6"
              onClick={copyUrl}
            >
              Copy Link
            </button>
            <input
              type="text"
              aria-hidden="true"
              readOnly
              ref={urlRef}
              value={props.url}
            />
          </Fragment>
        }
      </div>
    </div>
  )
}
  
export default UploadBox