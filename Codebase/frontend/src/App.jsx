import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import Nav from "./component/Nav"


function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
      <Nav/>
      <RouterProvider router={router} />
      

    </div>
  )
}

export default App
