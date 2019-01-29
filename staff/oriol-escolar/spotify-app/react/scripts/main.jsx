
function Feedback({ message, level }) {
    return <section className={`feedback ${level ? `feedback--${level}` : ''}`}>{message}</section>
}



class App extends React.Component {

    state = {

        loginFeedback: '',
        registerFeedback:'',
        loginVisible:true,
        registerVisible: false

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


    handleRegister = (name, surname, email, password, passwordConfirmation) => {

        
        try {
            
            logic.register(name, surname, email, password, passwordConfirmation, () => {
                this.setState({registerFeedback:''})
                this.goToLogin();

            })


        } catch ({ message }) {

            this.setState({registerFeedback:message})

        }


    }


    goToRegister = ()=>{

        console.log(this.state)
        this.setState({loginVisible:false})
        this.setState({registerVisible:true})


    }
    goToLogin= () =>{

        this.setState({loginVisible:true})
        this.setState({registerVisible:false})


    }


    render() {

        const { state: { loginFeedback,registerFeedback,loginVisible,registerVisible }, handleLogin, handleRegister,goToLogin,goToRegister } = this

        return <main className='app'>
            <header class="text-center">
                <h1>🎶 Spotify App 🎧</h1>
            </header>
            
            
            {loginVisible && <LoginPanel onLogin={handleLogin} feedback={loginFeedback} goToRegister={goToRegister} />}
            {registerVisible && <RegisterPanel onRegister={handleRegister} feedback = {registerFeedback} goToLogin ={goToLogin}/>}

            
            


        </main>
    }


}

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

    handleForButton = event => {
        event.preventDefault();
        const {props: {goToRegister}}=this
        goToRegister();
    }

    



    render() {

        const { handleEmailInput, handlePasswordInput, handleFormSubmit,handleForButton, props: { feedback } } = this

        return <section className='login'>
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <label>Email</label>
                <input type="email" onChange={handleEmailInput} />
                <label>Password</label>
                <input type="passsword" onChange={handlePasswordInput} />
                <button>Login</button>
            </form>

            <button onClick={handleForButton}>Register</button>

            {feedback && <Feedback message={feedback} level='warn' />}


        </section>


    }


}

class RegisterPanel extends React.Component {

    state = {

        email: '',
        password: '',
        name: '',
        surname: '',
        confirmPassword: ''

    }

    handleEmailInput = event => this.setState({ email: event.target.value })
    handlePasswordInput = event => this.setState({ password: event.target.value })
    handleConfirmPasswordInput = event => this.setState({ confirmPassword: event.target.value })
    handleNameInput = event => this.setState({ name: event.target.value })
    handleSurnameInput = event => this.setState({ surname: event.target.value })
    handleFormSubmit = event => {
        event.preventDefault();
        const { state: {name,surname, email, password, confirmPassword }, props: { onRegister } } = this;
        onRegister(name,surname,email, password,confirmPassword)

    }

    handleForButton = event => {
        event.preventDefault();
        const {props: {goToLogin}}=this
        goToLogin();
    }


    render() {

        const { handleEmailInput, handlePasswordInput, handleConfirmPasswordInput, handleNameInput, handleSurnameInput, handleFormSubmit,handleForButton, props: { feedback } } = this

        return <section className='register'>
            <h2>Login</h2>

            <form onSubmit={handleFormSubmit}>
                <label>Name</label>
                <input type="text" onChange={handleNameInput} />
                <label>surname</label>
                <input type="text" onChange={handleSurnameInput} />
                <label>Email</label>
                <input type="email" onChange={handleEmailInput} />
                <label>Password</label>
                <input type="password" onChange={handlePasswordInput} />
                <label>confirmPassword</label>
                <input type="password" onChange={handleConfirmPasswordInput} />
                <button>Register</button>
            </form>


            <button onClick={handleForButton}>LogIn</button>
            {feedback && <Feedback message={feedback} level='warn' />}


        </section>


    }

}



ReactDOM.render(<App />, document.getElementById('root'))   
