import { db } from "../../firebase/config"
import { doc, onSnapshot } from "firebase/firestore"
import { ChatContext } from "../../context/context"
import { useEffect, useContext } from "react"
import { UsersCardComponent } from "../03-components/UsersCardComponent"
import { UsersFormComponent } from "../03-components/UsersFormComponent"
import { UsersSettingsComponent } from "../03-components/UsersSettingsComponent"

const UsersSection = ({trigger, setTrigger}) => {
    const { uid, users, setUsers, fUsers } = useContext(ChatContext)
    
    const getUsers = async() => {
        try {
            const q = doc(db, 'users', 'userlist')
            onSnapshot(q, doc => setUsers( doc.data().list ) )
        } catch (error) {console.log(error)}
    }

    useEffect(()=>{
        getUsers()
    },[])

    const arr = uid && fUsers.length === 0 ? users : fUsers
   
    return(
        <aside className={`user ${trigger ? 'is-menu-open' : ''}`}>
            <div className="user__screen">
                <UsersSettingsComponent />
                <UsersFormComponent />
                <div className="user__list">
                    <section className="user__cards">
                        {
                            arr.map( user => 
                                user.user !== uid && (
                                    <UsersCardComponent 
                                        key={user.user} 
                                        uuid={user.user} 
                                        email={user.email}
                                        setTrigger={setTrigger}
                                    /> 
                                ) 
                            )
                        }
                    </section>
                </div>
            </div>
        </aside>
    )
}

export { UsersSection }