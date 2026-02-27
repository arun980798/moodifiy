import { useState } from 'react'
import FaceExpression from './feature/expression/component/Faceexpression'


function App() {
  const [count, setCount] = useState(0)

  return (
    <><FaceExpression/></>
  )
}

export default App
