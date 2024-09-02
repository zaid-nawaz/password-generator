import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length,setLength] = useState(8);
  const [charAllowed,setCharAllowed] = useState(false);
  const [numAllowed,setNumAllowed] = useState(false);
  const [password,setPassword] = useState("");
  const passwordref = useRef(null);

  const passwordgenerator = useCallback(()=>{
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (charAllowed) str += "!@#$%^&*()_-+=[]{}|;:,.<>/?`~";
    if (numAllowed) str += "0123456789";

    for (let index = 0; index <  length; index++) {
      let charindex = Math.floor(Math.random() * str.length);
      pass += str[charindex];
      
    }
    setPassword(pass);
  },[length,charAllowed,numAllowed,setPassword])

  useEffect(()=>{
    passwordgenerator();
  },[length,charAllowed,numAllowed,passwordgenerator])

  const copytoclipboard = () => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password)
  }
 
  return (
    <>
    <h1 className='my-5'>Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
    <input type="text" className='outline-none w-full py-1 px-3' value={password} readOnly ref={passwordref}/>
    <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copytoclipboard}>Copy</button>

    </div>
    <div>
    <input type="range" onChange={(e)=>{setLength(e.target.value)}} max={100} min={1} value={length} className='m-10 mr-2' name="" id="length" />
    <label htmlFor="length">length {"("+length+")"}</label>
    <input type="checkbox" defaultChecked={charAllowed} onChange={() => {
      setCharAllowed((prev) => !prev)
    }} className=' m-10 mr-2' name="" id="char" />
    <label htmlFor="char">char values</label>
    <input type="checkbox" defaultChecked={numAllowed} onChange={() => {
      setNumAllowed((prev) => !prev)
    }}  className=' m-10 mr-2' name="" id="number" />
    <label htmlFor="number">number values</label>
    </div>
    </>
  )
}

export default App
