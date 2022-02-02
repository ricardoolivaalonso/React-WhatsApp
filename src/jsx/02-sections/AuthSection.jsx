import { useState} from 'react'
import { LogInComponent } from '../03-components/LogInComponent'
import { SignUpComponent } from '../03-components/SignUpComponent'

const AuthSection = () => {
    const [login, setLogin] = useState(true)

    return(
        <div className='modal'>
            <div className='modal__inner'>
                { login ? <LogInComponent setLogin={setLogin}/> : <SignUpComponent setLogin={setLogin}/> }         
            </div>
        </div>
    )
}

export { AuthSection }