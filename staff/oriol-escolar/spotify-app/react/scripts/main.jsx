class LoginPanel extends React.Component {

    state = {

        email: '',
        password: ''


    }

    handleEmailInput = event => this.setState({ email: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })
    handleFormSubmit = event => {
        event.preventDefault();
        const { state: { email, password }, props: { onLogin } } = this;
        onLogin(email, password)

    }



    render() {

        const { handleEmailInput, handlePasswordInput, handleFormSubmit, props: { feedback } } = this

        return <section className='login'>
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <label>Email</label>
                <input type="email" onChange={handleEmailInput} />
                <label>Password</label>
                <input type="passsword" onChange={handlePasswordInput} />
                <button>Login</button>
            </form>


            {feedback && <Feedback message={feedback} level='warn' />}


        </section>


    }


}

function Feedback({ message, level }) {
    return <section className={`feedback ${level ? `feedback--${level}` : ''}`}>{message}</section>
}





class App extends React.Component {

    state = {

        loginFeedback: ''

    }

    handleLogin = (email, password) => {
        try {
            logic.login(email, password, user => {
                console.log(user)

                this.setState({ loginFeedback: '' })
            })
        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }
    }


    render() {

        const { state: { loginFeedback }, handleLogin } = this

        return <main className='app'>
            <header class="text-center">
                <h1>🎶 Spotify App 🎧</h1>
            </header>

            <LoginPanel onLogin={handleLogin} feedback={loginFeedback} />


        </main>
    }


}

ReactDOM.render(<App />, document.getElementById('root'))   