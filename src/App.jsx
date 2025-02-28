import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import {SpreadsheetComponent} from '@syncfusion/ej2-react-spreadsheet';
import Spreadsheet from './components/Spreadsheet'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1 style={{ textAlign: "center" }}>Google Sheets Clone</h1>
     {/* <SpreadsheetComponent/> */}
     <Spreadsheet />
    </>
  )
}

export default App
