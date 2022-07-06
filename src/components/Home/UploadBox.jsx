import { useState, useEffect, useRef, Fragment } from 'react'

function UploadBox(props) {
  const [message, setMessage] = useState('Uploading...');
  const [url, setUrl] = useState('');
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  // Copy the URL to the clipboard
  const urlRef = useRef(null);
  function copyUrl() {
    urlRef.current.select();
    document.execCommand("copy");
  }

  // POST the upload
  useEffect(() => {
    const baseUrl = `${document.location.protocol}//${document.location.host}`;

    // Size check
    if (props.file.size > 20000000) {
      setMessage('File is too large.');
      setFailure(true);
      return false;
    }

    // Send fetch request
    let formData = new FormData();
    formData.append('upload', props.file);

    fetch(`${baseUrl}/upload`, {
      method: 'POST',
      credentials: 'same-origin',
      body: formData
    }).then(response => response.json()
    ).then(json => {
      const fileUrl = baseUrl + json.fileUrl;
      setMessage('Upload complete.');
      setSuccess(true);
      setUrl(fileUrl);
    }).catch(error => {
      setMessage('Upload failed.');
      setFailure(true);
    });
  }, []);

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
        <p className={`upload-message is-size-5 has-text-black-bis ${failure ? 'failed' : ''}`}>
          {message}
          {!failure && !success && 
            <progress className="progress is-small is-primary" />
          }
        </p>

        {/* BUTTONS */}
        {success &&
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
              value={fileUrl}
            />
          </Fragment>
        }
      </div>
    </div>
  )
}
  
export default UploadBox