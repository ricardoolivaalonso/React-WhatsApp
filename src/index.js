import React from 'react'
import ReactDOM from 'react-dom'
import App from './jsx/App'
import './scss/styles.scss'
import { ChatProvider } from './context/context.js'

ReactDOM.render(
	<React.StrictMode>
		<ChatProvider>
			<App />
		</ChatProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
