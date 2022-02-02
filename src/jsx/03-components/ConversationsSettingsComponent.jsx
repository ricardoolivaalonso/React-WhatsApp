import { useContext, useState } from "react"
import { ChatContext } from "../../context/context"
import { AvatarElement } from "../04-elements/AvatarElement"
import { SearchIconElement } from "../04-elements/SearchIconElement"
import { UsernameElement } from "../04-elements/UsernameElement"

const ConversationsSettingsComponent = () => {
    const { chatEmail, messages, fSetMessages, search, setSearch } = useContext(ChatContext)

    const filterUsers = (e) => {
        const searchMessage = e.target.value.toLowerCase()
        setSearch(searchMessage)

        const filteredMessages = messages.filter( m => m.content.toLowerCase().includes(searchMessage))
        fSetMessages(filteredMessages)
    }

    return(
        <div className="conversation__settings">
            <div className="conversation__settings-profile">
                { chatEmail && <AvatarElement name={chatEmail} title="Envíale un mensaje"/> }
                { chatEmail && <UsernameElement name={chatEmail}/> }
            </div>
            <div className="conversation__settings-icons">
                <input 
                    className="conversation__settings-form" 
                    disabled={messages.length === 0 && 'disabled'} 
                    type="text" 
                    placeholder="Busca un mensaje" 
                    value={search} 
                    onChange={(e)=>filterUsers(e)}
                />
                <SearchIconElement color="#111b21"/>
            </div>
        </div>
    )
}

export { ConversationsSettingsComponent }