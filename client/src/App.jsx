import { ToastContainer, toast } from 'react-toastify';
import { RouterProvider } from "react-router-dom";

import { router } from "./routers"

function App() {
  return (
    <div>

      < RouterProvider router={router} />
      < ToastContainer />
    </div>
  )
}

export default App
