import './passwordReset.css'
import InputBox from "../../components/InputBox";
import { AppBar } from '../../components/AppBar'

function PasswordResetPage(){
    return(
        <>
        <AppBar />        <div className="password-reset-main-container">
         <h2 className='title'>Forgot Password?</h2>   
        <InputBox label={'Old Password'} placeholder={'Enter old password'} />
        <InputBox label={'New Password'} placeholder={'Enter new password'}/>
        <InputBox label={'Confirm Password'} placeholder={'Confirm new password'} />
        <button className='reset-btn'>Reset</button>
        </div>
        </>

    )
}

export default PasswordResetPage;