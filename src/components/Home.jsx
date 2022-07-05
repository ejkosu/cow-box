import { Fragment } from 'react'
import HelloMessage from './Home/HelloMessage'
import FileSelect from './Home/FileSelect'

function Home() {
  return (
    <Fragment>
      <HelloMessage />
      <FileSelect />
    </Fragment>
  )
}
  
export default Home