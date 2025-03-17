import React, {cache, useState} from 'react'

function Copybutton({textToCopy}) {
    const [isCopied,setIsCopied]=useState(false)

    const handleCopy= async ()=>{
        try{
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true)
            setTimeout(()=>setIsCopied(false),2000)
        }catch(error){
            console.log("Failed to copy text: ", error)
        }
    }
  return (
    <div>
        <button onClick={handleCopy} className='bg-yellow-300 rounded-full p-2 mb-3'>{
            isCopied ? "Copied!" : "Copy to Clipboard"}</button>
    </div>
  )
}

export default Copybutton