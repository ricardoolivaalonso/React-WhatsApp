import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { ChatContext } from "../../context/context"
import { useState, useContext  } from 'react'
import { NotificationComponent } from "./NotificationComponent"

const LogInComponent = ({setLogin}) => {
    const { setUid, setEmail, notification, setNotification } = useContext(ChatContext)
    const [ newEmail, setNewEmail ] = useState('')
    const [ newPass, setNewPass ] = useState('')

    const Login = async(e) => {
        e.preventDefault()
		const auth = getAuth()

        if(newEmail && newPass){
            try {
                const signIn = await signInWithEmailAndPassword(auth, newEmail, newPass)
                const user = await signIn.user 
    
                if(user.error) throw new Error ({myStatus: user.error})
                
                setEmail(user.email)
                setUid(user.uid)
            } catch ( error ) { 
                setNotification(error.code)
                console.log("error:",error) 
            } 
        }
	}

    return(
        <form className="account" onSubmit={(e)=>Login(e)}>
            <div className='account__row'>
                <a className='account__title'>log in</a>
                <a className='account__subtitle' onClick={()=>setLogin(false)}>sign up</a>
            </div>
            <input className="account__input" type="email" required placeholder='Correo' value={newEmail} onChange={(e)=>setNewEmail(e.target.value)}/>
            <input className="account__input" type="password" required minLength="6" placeholder="Contraseña" value={newPass} onChange={(e)=>setNewPass(e.target.value)} />
            { notification && <NotificationComponent />}
            <button className="account__submit" type="submit">Iniciar Sesión</button>
        </form>
    )
}

export { LogInComponent }