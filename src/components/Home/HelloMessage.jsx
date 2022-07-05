import { NavLink } from 'react-router-dom';

function HelloMessage() {
  return (
    <div id="hello" className="section">
      <div className="container">
        <p className="subtitle is-size-5 has-text-dark">
          Files up to 20 MB are allowed. Please read the&nbsp;
          <NavLink to="/about">
            About page.
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default HelloMessage