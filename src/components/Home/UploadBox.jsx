import { useState, useEffect, useRef, Fragment } from 'react';
import 'whatwg-fetch';

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
    if (props.file.size > 20971520) {
      setMessage('File is too large.');
      setFailure(true);
    }

    // Send fetch request
    if (!false) {
      let formData = new FormData();
      formData.append('upload', props.file);
  
      fetch(`${baseUrl}/upload`, {
        method: 'POST',
        credentials: 'same-origin',
        body: formData
      }).then(response => response.json()
      ).then(json => {
        const fileUrl = baseUrl + "/" + json.newName;
        setMessage('Upload complete.');
        setSuccess(true);
        setUrl(fileUrl);
      }).catch(error => {
        setMessage('Upload failed.');
        setFailure(true);
      });
    }
  }, []);

  return (
    <div className="column is-one-third">
      <div className="box upload-box">
        {/* FILE NAME */}
        <input
          type="text"
          className="upload-name is-size-5 has-text-black-bis"
          readOnly
          value={props.file.name}
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
              href={url}
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
              value={url}
            />
          </Fragment>
        }
      </div>
    </div>
  )
}
  
export default UploadBox