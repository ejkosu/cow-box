function About() {
  return (
    <div id="about" class="section">
      <div class="container">
        <h1 class="title is-size2 is-size-3-mobile has-text-dark">
          About
        </h1>

        <h2 class="is-size-4 is-size-5-mobile has-text-dark has-text-weight-bold">
          How long are files hosted?
        </h2>
        <p class="is-size-5 is-size-6-mobile has-text-dark">
          Uploaded files are deleted after 48 hours.
        </p>

        <h2 class="question is-size-4 is-size-5-mobile has-text-dark has-text-weight-bold">
          What file types aren't allowed?
        </h2>
        <p class="is-size-5 is-size-6-mobile has-text-dark">
          The following types are not allowed: .scr, .exe, .cpl, and .jar.
        </p>

        <h2 class="question is-size-4 is-size-5-mobile has-text-dark has-text-weight-bold">
          Banned content:
        </h2>
        <p class="is-size-5 is-size-6-mobile has-text-dark">
          Do not upload files illegal under U.S. Law. 
          For reporting an illegal file (or DMCA request), please contact the admin immediately at
          <a href="mailto:placeholder@email.com"> placeholder@email.com</a>.
        </p>
      </div>
    </div>
  )
}
  
export default About