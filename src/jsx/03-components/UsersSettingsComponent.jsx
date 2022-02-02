import { useContext } from "react"
import { ChatContext } from "../../context/context"
import { AvatarElement } from "../04-elements/AvatarElement"
import { LogguedOutIconElement } from "../04-elements/LogguedOutIconElement"
import { UsernameElement } from "../04-elements/UsernameElement"

const UsersSettingsComponent = () => {
    const { email } = useContext(ChatContext)

    return(
        <header className="user__settings">
            <div className="user__settings-profile">
                <AvatarElement name={email} title="Este eres tú"/>
                <UsernameElement name={email}/>
            </div>
            <div className="user__settings-icons">
                <LogguedOutIconElement />
            </div>
        </header>
    )
}

export { UsersSettingsComponent }