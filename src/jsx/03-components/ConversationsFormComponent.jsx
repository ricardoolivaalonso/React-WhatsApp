import { db, storage } from "../../firebase/config"
import { addDoc, collection } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useState, useContext } from "react"
import { EmojiIconElement } from "../04-elements/EmojiIconElement"
import { FileIconElement } from "../04-elements/FileIconElement"
import { SendIconElement } from "../04-elements/SendIconElement"
import { ChatContext } from "../../context/context"
import { v4 as uuidv4 } from 'uuid'
import Picker from 'emoji-picker-react'

const ConversationsFormComponent = () => {
    const { uid, chat } = useContext(ChatContext)

    let [ text, setText ] = useState('')
    const [ chosenEmoji, setChosenEmoji ] = useState('');
    const [ isVisible, setIsVisible] = useState(false)
    const [ fileUrl, setFileUrl]  = useState(null)

    const onFileChange = async (e) => {
        const file = e.target.files[0]
        const fileRef = ref(storage, `images/${file.name}`)
        await uploadBytes(fileRef, file)
    
        getDownloadURL(fileRef)
            .then((url) => {
                console.log(url)
                setFileUrl(url)
            })
            .catch(e => {
                console.log(e);
            })       
    };

    const getBox = (e) => {
        setChosenEmoji('')
        setText(e.target.value)
    }

    const createMessage = async(e) => {

        try { 
            if(text.trim().length > 0){
                const createMSG = {               
                    uidMSG: uuidv4(),
                    email: 'test@email.com',
                    content: text,
                    timestamp: Date.now(),
                    uidA: uid,
                    uidB: chat,
                    uidAB: {[uid]: null, [chat]: null},
                    image: fileUrl
            
                }
    
                await addDoc(collection(db, "conversations"), createMSG )
            }
            setText('')
            setIsVisible(false)
            setFileUrl(null)
            
        } catch (error) { console.log(error) } 
    }

    const onEmojiClick = (e, emojiObject) => {
        setText(text += emojiObject.emoji)
        setChosenEmoji(emojiObject.emoji)
    }
    
    return(
        <form className="message-form" onSubmit={(e)=>e.preventDefault()}>
            <EmojiIconElement onMyClick={() => setIsVisible(!isVisible)}/>

            <input type="file" id="mf-upload" disabled={!chat && 'disabled' } onChange={onFileChange} accept="image/*"/>
            <label htmlFor="mf-upload" className="message-form__file">
                <FileIconElement color={fileUrl ?'#25d366': '#54656f'}/>
            </label>

            <textarea 
                className="message-form__input" 
                placeholder="Escribe un mensaje aquí"
                value={text}
                onChange={(e)=>getBox(e)}
            >
            </textarea>
            {   
                chat &&
                isVisible && (
                    <div className="emojibox">
                        <Picker onEmojiClick={onEmojiClick} onClick={onEmojiClick} />
                    </div>
                )
            }
            <SendIconElement chat={chat} onMyClick={createMessage}/>
        </form>
    )
}

export { ConversationsFormComponent }