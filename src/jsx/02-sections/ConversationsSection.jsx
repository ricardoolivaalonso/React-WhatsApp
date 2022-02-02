import { useContext, useEffect, useRef } from "react"
import { ChatContext } from "../../context/context"
import { ConversationsCardComponent } from "../03-components/ConversationsCardComponent"
import { ConversationsFormComponent } from "../03-components/ConversationsFormComponent"
import { ConversationsSettingsComponent } from "../03-components/ConversationsSettingsComponent"
import { PCIconElement } from '../04-elements/PCIconElement'

const ConversationsSection = () => {
    const { messages, chat, fMessages } = useContext(ChatContext)
	const chatRef = useRef(null)

	const scrollToBottom = () => chatRef.current.scrollIntoView({ behavior: "smooth" })

	useEffect(() => {
        scrollToBottom()
    }, [messages])

    const arr = fMessages.length === 0 ? messages : fMessages

    return(
        <main className="conversation">
			<ConversationsSettingsComponent />
			<div className="conversation__list">
				{ chat && <span className="conversation__counter">Mensajes: {messages.length}</span> }
				{ 
					chat ? 
					<section className="conversation__cards">
						{ arr.map( msg => <ConversationsCardComponent key={msg.uidMSG} msg={msg}/>) }
					</section>
					:
					<PCIconElement />
				}
				<div ref={chatRef}></div>
			</div>
			<ConversationsFormComponent />
		</main>
    )
}

export { ConversationsSection }