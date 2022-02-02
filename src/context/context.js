import { useState, createContext } from "react"
const ChatContext = createContext()

const ChatProvider = ({children}) => {
    const [ uid, setUid ] = useState()
    const [ email, setEmail ] = useState()
    const [ users, setUsers ] = useState([])
    const [ fUsers, fSetUsers ] = useState([])
    const [ fMessages, fSetMessages ] = useState([])
    const [ chat, setChat ] = useState('')
    const [ chatEmail, setChatEmail ] = useState('')
    const [ messages, setMessages ] = useState([])
    const [ notification, setNotification ] = useState(null)
    const [ search, setSearch ] = useState('')

    const data = {
        uid, setUid,
        email, setEmail,
        users, setUsers,
        fUsers, fSetUsers,
        messages, setMessages,
        fMessages, fSetMessages,
        chat, setChat,
        chatEmail, setChatEmail,
        notification, setNotification,
        search, setSearch
    }

    return(
        <ChatContext.Provider value={data}>
            {children}
        </ChatContext.Provider>
    )
}

export { ChatContext, ChatProvider}