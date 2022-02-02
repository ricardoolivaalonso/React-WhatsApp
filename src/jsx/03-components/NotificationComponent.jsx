import { useContext } from 'react'
import { ChatContext } from "../../context/context"

const NotificationComponent = () => {
    const { notification, setNotification } = useContext( ChatContext )

    setTimeout( () => { setNotification(null) }, 4000)

    return <span className="notification">{notification}</span>
}

export { NotificationComponent }