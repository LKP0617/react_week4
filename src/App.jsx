import { useState } from 'react'
import Login from './pages/LoginPage';
import ProductPage from './pages/ProductPage';

function App() {
  const [isContent, setIsContent] = useState(false);

  return (
    <>
      {
        isContent ?
          <ProductPage setIsContent={setIsContent} />
          :
          <Login setIsContent={setIsContent} />
      }      
    </>
  )
}

export default App