import { db } from "../../firebase/config"
import { ChatContext } from "../../context/context"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useState, useContext  } from 'react'
import { NotificationComponent } from "./NotificationComponent"

const SignUpComponent = ({setLogin}) => {
    const { notification, setNotification } = useContext(ChatContext)
    const [ email, getEmail ] = useState('')
    const [ pass, setPass ] = useState('')

    const SignUp = async(e) => {
        e.preventDefault()
		const auth = getAuth()
		if(email && pass){
            try {
                const account = await createUserWithEmailAndPassword(auth, email, pass)
                const createUser = {
                    user: account.user.uid,
                    email: account.user.email,
                    lastLoginAt: account.user.metadata.lastLoginAt
                }
                const user = doc(db, "users", "userlist")
                await updateDoc(user, { list: arrayUnion(createUser)})
    
            } catch ( error ) { 
                setNotification(error.code)
                console.log("error:",error.code) 
            }
        }
	}
    
    return(
        <form className="account" onSubmit={SignUp}>
            <div className='account__row'>
                <a className='account__title'>sign up</a>
                <a className='account__subtitle' onClick={()=>setLogin(true)}>log in</a>
            </div>
            <input className="account__input" type="email" required placeholder='Correo' value={email} onChange={(e)=>getEmail(e.target.value)} />
            <input className="account__input" type="password" required minLength="6" placeholder="Contraseña" value={pass} onChange={(e)=>setPass(e.target.value)}/>
            { notification && <NotificationComponent />}
            <button className="account__submit" type="submit">Crear Cuenta</button>
        </form>
    )
}

export { SignUpComponent }