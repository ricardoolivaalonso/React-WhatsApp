import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useContext, useState } from "react"
import { UsersSection } from "./02-sections/UsersSection"
import { ConversationsSection } from "./02-sections/ConversationsSection"
import { ChatContext } from "./../context/context"
import { AuthSection } from "./02-sections/AuthSection"

const App = () => {
    const { setUid, setEmail, uid } = useContext(ChatContext)
	const [ trigger, setTrigger ] = useState(false)

	useEffect(() => {
		const auth = getAuth()
		onAuthStateChanged(auth, (user) => {
			if (user) { 
				setEmail(user.email)
            	setUid(user.uid)
			} 
		})
	}, [])

	return(
		<div className="canvas">
			{ uid && <button className="trigger" onClick={()=>setTrigger(!trigger)}>&#8592;</button>}
			<UsersSection trigger={trigger} setTrigger={setTrigger}/>
			<ConversationsSection />	
			{ !uid && <AuthSection />}
		</div>
	)
}

export default App
