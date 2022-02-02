import { db } from "../../firebase/config"
import { doc, deleteDoc } from "firebase/firestore"
import { ChatContext } from "../../context/context"
import { useContext, useState } from "react"
import { formatRelative, subDays } from 'date-fns'
import { es } from 'date-fns/locale'

const ConversationsCardComponent = ({msg}) => {
    const { uid } = useContext(ChatContext)
    const { uidA, content, timestamp, idDoc, image} = msg
    const [ icon, setIcon ] = useState(false)   

 
    const deleteMessage = async(messageID) => {
        try {
            deleteDoc(doc(db, 'conversations', messageID))
        } catch (error) {console.log(error)}
    }

    return(
        <article className={`message ${uidA === uid && 'message--user'}`} onClick={()=>setIcon(!icon)}>
            { image && <img className="message__img" src={image} alt="Image" />}
            <div className="message__row">
                <span className="message__content">{content}</span>
                <span className="message__date">{formatRelative(subDays(timestamp, 0), new Date(), { locale: es })}</span>
            </div>
            {   
                icon &&
                uid === uidA && (
                    <a className="message__delete" onClick={(e)=>deleteMessage(idDoc)} title="Eliminar este mensaje">
                        <svg className="svg-icon" viewBox="0 0 20 20">
                            <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306" />
                        </svg>
                    </a>
                )
            }
        </article>  
    )
}

export { ConversationsCardComponent }