import { db } from "../../firebase/config"
import { collection, query, onSnapshot, where  } from "firebase/firestore"
import { useEffect, useContext } from "react"
import { AvatarElement } from "../04-elements/AvatarElement"
import { UsernameElement } from "../04-elements/UsernameElement"
import { ChatContext } from "../../context/context"

const UsersCardComponent = ({uuid, email, setTrigger}) => {
    const { uid, users, chat, setChat, setMessages, setChatEmail, fSetMessages,setSearch } = useContext(ChatContext)

    const readConversation = async(e, uide, email) => {
        setChat(uide)
        setChatEmail(email)
        fSetMessages([])
        setSearch('')
        setTrigger(false)

        try {
            const q = query(
                collection(db, 'conversations'),
                where('uidAB', '==', {[uid]: null, [uide]: null})
            )
            onSnapshot(q, querySnapshot => {
                let msgList = []
           
                querySnapshot.forEach( msg => {
                    msgList = [
                        ...msgList,
                        {
                            idDoc: msg.id,
                            uidMSG: msg.data().uidMSG,
                            content: msg.data().content,
                            email: msg.data().email,
                            timestamp: msg.data().timestamp,
                            uidA: msg.data().uidA,
                            uidB: msg.data().uidB,
                            uidAB: msg.data().uidAB,
                            image: msg.data().image
                        }
                    ]
                    return msgList.sort((a,b) => a.timestamp - b.timestamp )
                })
                setMessages(msgList)
            })

        } catch (error) {console.log(error)}
    }
   
    useEffect(()=>{
        readConversation()
    },[users])

    return(
        <article className={`card ${uuid === chat && 'card--active'}`} onClick={(e)=>readConversation(e, uuid, email)} id={uuid} title={`Click para enviar un mensaje`}>
            <AvatarElement name={email}/>
            <div className="card__description">
                <UsernameElement name={email}/>
            </div>
            <div className="card__info">
                {/* <span className="card__info-date"></span> */}
                {/* <span className="card__info-counter"></span> */}
            </div>
        </article>
    )
}

export { UsersCardComponent }