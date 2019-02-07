'use strict'

import React, { Component, Fragment } from 'react'
import { Route, Link, Redirect, withRouter } from 'react-router-dom'
import './index.sass'
import logic from '../Logic'
import Login from '../Login'
import Register from '../Register'

class Landing extends Component {

    state = {modalVisible: false, loginFeedback: null, registrationFeedback: null}

    handleLogin = (email, password) =>{
        try {
          logic.login(email, password)
            .then(() => {
                this.setState({loginFeedback: null})
                this.props.history.push('/home/search')

            })
            .catch(({message}) => this.setState({ loginFeedback: message }))
        } catch (message) {
          this.setState({ loginFeedback: message })
        }
    }

    handleRegistration = (name, surname, email, password, passwordConfirmation) => {
        try {
            logic.register(name, surname, email, password, passwordConfirmation) 
                .then(()=>this.setState({modalVisible: true}))
                .catch(({message}) => this.setState({ loginFeedback: message }))
        } catch ({message}) {
            this.setState ({registrationFeedback: message})
        }
    }

    handleLanding = () => {
        this.setState({loginFeedback: null, registrationFeedback: null})
        this.props.history.push('/')
    }

    handleToLogin = () => {
        this.setState({loginFeedback: null, registrationFeedback: null, modalVisible: false})
        this.props.history.push('/login')
    }

    componentDidMount() {
        console.log('did mount')
    }

    render() {

        const {handleLogin, handleRegistration, handleToLogin, handleLanding, state:{loginFeedback, registrationFeedback, modalVisible}} = this

        return <section className="container foto">
        <Route exact path="/" render={() =>
            <Fragment>
                <div className="columns is-mobile is-centered has-text-centered">
                    <div className="modal is-active is-clipped">
                        <div className="modal-background"></div>
                        <div className="modal-content column is-half-widescreen is-three-fifths-tablet is-three-quarters-mobile is-centered">
                            <h1 className="title is-1 white">Welcome to Marvel App</h1>
                            <h5 className="subtitle is-5 white">Your free Marvel repository</h5>
                            <div className="is-grouped btn_grp">
                                <p className="control"><Link to='/login' className="button is-danger is-outlined is-small is-rounded">Log in</Link></p>
                                <p>&nbsp;</p>
                                <p className="control"><Link to='/register' className="button is-inverted is-outlined is-danger is-small is-rounded">Sign Up</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>} />
            <Route exact path='/login' render={() => logic.userLoggedIn ? <Redirect to="/home/search" /> : <Login onLogin={handleLogin} feedback={loginFeedback} onLanding={handleLanding}/>} />
            <Route exact path='/register' render={() => logic.userLoggedIn ? <Redirect to="/home/search" /> : <Register onRegistration={handleRegistration} feedback={registrationFeedback} onLanding={handleLanding} modalVisible={modalVisible} onLogin={handleToLogin}/>} />
        </section>
    }
}

export default withRouter(Landing)