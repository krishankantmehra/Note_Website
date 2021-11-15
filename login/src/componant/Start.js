import React, { Component } from 'react'
import Main from './main'
import Logged from './logged'

class startPage extends Component {
	constructor(param) {
		super(param)

		this.state = {
			user: "",
			child: <Main logging={this.logging} />
		}
	}

	componentDidMount() {
		var user = window.sessionStorage.getItem('user')

		if (user) {
			this.logging(user)
		}
	}

	logging = (user) => {

		this.setState(
			{
				user: user,
				child: <Logged userName={user} />
			}
		)

	}
	render() {
		return (

			<div id="start">

				{this.state.child}
				<a className='fixed-bottom opacity-50 bg-light' href='#start' style={{ width: "20px" }}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-circle" viewBox="0 0 16 16">
						<path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
					</svg>
				</a>
			</div>

		)
	}
}

export default startPage
