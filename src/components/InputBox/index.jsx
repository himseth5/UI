import './inputBox.css';
import { useState } from "react";

function InputBox(props){
     const [inputValue,setInputValue]=useState('');
     
    const {label,placeholder}=props;
    
    const handleChange=(e)=>{
        setInputValue(e.target.value);
    }
   return(
    <div className='input-box-container'>
    <label htmlFor='input-box' className='input-box-label'>
        {label}
        </label>
        <input className='input-box' type="text" placeholder={placeholder} onChange={handleChange}/>
        </div>
   )

}

export default InputBox;