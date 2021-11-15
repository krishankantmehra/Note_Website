import React, { Component } from 'react'
import AddData from './AddData'
import Content from './content'
import Navbar from './navbar'

class logged extends Component {

    render() {
        return (

            <>

                <Navbar userName={this.props.userName} />
                <AddData userName={this.props.userName} />
                <h1 id='loading' className='text-center' style={{ opacity: "0%" }} >Getting data...</h1>
                <Content userName={this.props.userName} />
            </>
        )
    }
}

export default logged
