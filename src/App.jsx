import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './assets/components/MainLayout'
import Chat from './assets/components/Chat'
import History from './assets/components/History'

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<Chat/>} />
        <Route path='chat' element={<Chat/>} />
        <Route path='history' element={<History/>} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
