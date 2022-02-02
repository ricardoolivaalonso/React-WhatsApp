import { CloseIconElement } from "../04-elements/CloseIconElement"
import { SearchIconElement } from "../04-elements/SearchIconElement"
import { useContext, useState  } from 'react'
import { ChatContext } from "../../context/context"

const UsersFormComponent = () => {
    const { users, fSetUsers } = useContext(ChatContext)
    const [ search, setSearch ] = useState('')

    const filterUsers = (e) => {
        const searchUser = e.target.value.toLowerCase()
        setSearch(searchUser)

        const filteredUsers = users.filter( u => u.email.toLowerCase().includes(searchUser))
        fSetUsers(filteredUsers)
    }
    const clearForm = () => {
        setSearch('')
        fSetUsers('')
    }

    return(
        <form className="user__form" onSubmit={(e)=>e.preventDefault()}>
            <div className="user__form-column">
                <SearchIconElement />
            </div>
            <input className="user__form-input" type="text" placeholder="Busca un chat" value={search} onChange={(e)=>filterUsers(e)} />
            <div className="user__form-column" >
                <CloseIconElement onMyClick={()=>clearForm()}/>
            </div>
        </form>
    )
}

export { UsersFormComponent }