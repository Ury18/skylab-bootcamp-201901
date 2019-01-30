spotifyApi.token = 'BQDPmnj9000sTuQd6cIob-QLTI4XWR_mPItJYl9d1WtX4DIJiFXvnegHXlUGfI8frWCiVqBOMAqKqeCUPcdPfT4BpRniVmjwil747Ue3HJgnk-GHH_y3owMp9pnWAq71ClKPfY3jWq3LuA'



function Feedback({ message, level }) {
    return <section className={`feedback ${level ? `feedback--${level}` : ''}`}>{message}</section>
}



class App extends React.Component {

    state = {

        loginFeedback: '',
        registerFeedback: '',
        searchFeedback: '',
        ArtistList: [],
        AlbumList: [],
        TrackList: [],
        Track: [],
        loginVisible: true,
        registerVisible: false,
        searchPanelVisible: false,
        artistListVisible: false,
        albumListVisible: false,
        trackListVisible: false,
        trackVisible: false

    }

    handleLogin = (email, password) => {
        try {
            logic.login(email, password, user => {
                console.log(user)

                this.setState({ loginFeedback: '' })
                this.setState({ searchPanelVisible: true })
                this.setState({ loginVisible: false })
            })
        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }
    }


    handleRegister = (name, surname, email, password, passwordConfirmation) => {


        try {

            logic.register(name, surname, email, password, passwordConfirmation, () => {
                this.setState({ registerFeedback: '' })
                this.goToLogin();

            })


        } catch ({ message }) {

            this.setState({ registerFeedback: message })

        }


    }



    handleSearch = (query) => {


        try {

            logic.searchArtists(query, (error, ArtistList) => {
                if (error) console.error(error)
                else {
                    this.setState({ searchFeedback: '', ArtistList, artistListVisible: true })

                }
            })


        } catch ({ message }) {

            this.setState({ searchFeedback: message })

        }


    }


    Logout = () => {
        this.setState({ loginVisible: true })
        this.setState({ searchPanelVisible: false, artistListVisible: false, albumListVisible: false, trackListVisible: false, trackVisible: false })

    }

    ClearLists = () => {
        
        this.setState({ artistListVisible: false, albumListVisible: false, trackListVisible: false, trackVisible: false })

    }

    goToRegister = () => {

        console.log(this.state)
        this.setState({ loginVisible: false })
        this.setState({ registerVisible: true })


    }
    goToLogin = () => {

        this.setState({ loginVisible: true })
        this.setState({ registerVisible: false })


    }
    goBackToArtistList = () => {

        this.setState({ albumListVisible: false, artistListVisible: true })

    }

    goBackToAlbumList = () => {

        this.setState({ trackListVisible: false, albumListVisible: true })

    }

   

    LoadAlbums = (id) => {

        try {

            logic.retrieveAlbums(id, (error, AlbumList) => {
                if (error) console.error(error)
                else {
                    this.setState({ AlbumList, albumListVisible: true, artistListVisible: false })
                    console.log(AlbumList)

                }

            })

        } catch (err) {



        }
    }

    LoadTracks = (id) => {

        try {

            logic.retrieveTracks(id, (error, TrackList) => {
                if (error) console.error(error)
                else {
                    this.setState({ TrackList, trackListVisible: true, albumListVisible: false })
                    console.log(TrackList)

                }

            })

        } catch (err) {



        }
    }
    LoadTrack = (id) => {

        try {

            logic.retrieveTrack(id, (error, Track) => {
                if (error) console.error(error)
                else {
                    this.setState({ Track, trackVisible: true})
                    console.log(this.state.Track)

                }

            })

        } catch (err) {



        }
    }

    render() {

        const { state: { loginFeedback, registerFeedback, searchFeedback, loginVisible, registerVisible, searchPanelVisible, ArtistList, AlbumList, TrackList, Track, artistListVisible, albumListVisible, trackListVisible, trackVisible }, handleLogin, handleRegister, handleSearch, goToLogin, goToRegister, Logout, LoadAlbums, LoadTracks, LoadTrack, goBackToAlbumList, goBackToArtistList,ClearLists } = this

        return <main className='app'>
            <header className="text-center">
                <h1>🎶 Spotify App 🎧</h1>
            </header>


            {loginVisible && <LoginPanel onLogin={handleLogin} feedback={loginFeedback} goToRegister={goToRegister} />}
            {registerVisible && <RegisterPanel onRegister={handleRegister} feedback={registerFeedback} goToLogin={goToLogin} />}
            {searchPanelVisible && <SearchPanel onClear={ClearLists} onSearch={handleSearch} feedback={searchFeedback} goToLogout={Logout} />}
            {artistListVisible && <ArtistsPanel artistList={ArtistList} onArtistSelect={LoadAlbums} />}
            {albumListVisible && <AlbumsPanel goToArtists={goBackToArtistList} albumList={AlbumList} onAlbumSelect={LoadTracks} />}
            {trackListVisible && <TrackListPanel goToAlbums={goBackToAlbumList} trackList={TrackList} onTrackSelect={LoadTrack} />}
            {trackVisible && <TrackPanel track={Track} />}






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
        const { props: { goToRegister } } = this
        goToRegister();
    }





    render() {

        const { handleEmailInput, handlePasswordInput, handleFormSubmit, handleForButton, props: { feedback } } = this

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
        const { state: { name, surname, email, password, confirmPassword }, props: { onRegister } } = this;
        onRegister(name, surname, email, password, confirmPassword)

    }

    handleForButton = event => {
        event.preventDefault();
        const { props: { goToLogin } } = this
        goToLogin();
    }


    render() {

        const { handleEmailInput, handlePasswordInput, handleConfirmPasswordInput, handleNameInput, handleSurnameInput, handleFormSubmit, handleForButton, props: { feedback } } = this

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

class SearchPanel extends React.Component {
    state =
        {

            query: ''


        }

    handleQuery = event => this.setState({ query: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault();
        const { state: { query }, props: { onSearch } } = this;
        onSearch(query)

    }

    handleForButton = event => {
        event.preventDefault();
        const { props: { goToLogout } } = this
        goToLogout();
    }
    handleForButtonClear = event => {
        event.preventDefault();
        const { props: { onClear } } = this
        onClear();
    }

    render() {

        const { handleQuery, handleFormSubmit, handleForButton,handleForButtonClear, props: { feedback } } = this

        return <section className="search">




            <div>

                <div>
                    <button onClick={handleForButton}>Logout</button>
                    
                </div>
            </div>
            <button onClick={handleForButtonClear}>Clear Results</button>

            <form onSubmit={handleFormSubmit}>
                <input className="form-control" placeholder="Search an artist" type="text" name="query" onChange={handleQuery}></input>
                <div>
                    <button>Search</button>
                </div>
            </form>

            {feedback && <Feedback message={feedback} level='warn' />}

        </section>

    }


}

class ArtistsPanel extends React.Component {



    onArtistSelected = (id) => {



        const { props: { onArtistSelect } } = this

        onArtistSelect(id)


    }




    render() {



        const { props: { artistList }, onArtistSelected } = this
        return <section>
            <h3>Artists</h3>
            <div>
                {artistList.map(({ id, images, name }) => {
                    return <div id-data={id} onClick={() => onArtistSelected(id)} >
                        <img src={images[0] ? images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'} alt="" />
                        <h4>{name}</h4>
                    </div>
                })}
            </div>
        </section>
    }
}


class AlbumsPanel extends React.Component {


    onAlbumSelected = (id) => {



        const { props: { onAlbumSelect } } = this

        onAlbumSelect(id)


    }

    handleForButton = event => {
        event.preventDefault();
        const { props: { goToArtists } } = this
        goToArtists();
    }

    render() {



        const { props: { albumList }, onAlbumSelected, handleForButton } = this
        return <section>
            <h3>Albums</h3>
            <button onClick={handleForButton}>Back</button>
            <div>
                {albumList.map(({ id, images, name }) => {
                    return <div id-data={id} onClick={() => onAlbumSelected(id)} >
                        <img src={images[0] ? images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'} alt="" />
                        <h4>{name}</h4>
                    </div>
                })}
            </div>
        </section>
    }

}

class TrackListPanel extends React.Component {


    onTrackSelected = (id) => {



        const { props: { onTrackSelect } } = this

        onTrackSelect(id)


    }
    handleForButton = event => {
        event.preventDefault();
        const { props: { goToAlbums } } = this
        goToAlbums();
    }

    render() {



        const { props: { trackList }, onTrackSelected, handleForButton } = this
        return <section>
            <button onClick={handleForButton}>Back</button>
            <h3>Tracks</h3>
            <div>
                {trackList.map(({ id, name }) => {
                    return <div id-data={id} onClick={() => onTrackSelected(id)} >
                        <h4>{name}</h4>
                    </div>
                })}
            </div>
        </section>
    }

}


class TrackPanel extends React.Component {

    

    render() {
        const { props: { track } } = this
        return <section className='playingTrack'>
            
            <div>

                <h4>{track.name}</h4>
                <audio controls autoPlay src={track.preview_url}></audio>

            </div>




        </section>








    }




}




ReactDOM.render(<App />, document.getElementById('root'))   
