import React, { Component } from 'react';
import './App.css';
import logic from './components/logic'


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
                  this.setState({ searchFeedback: '', ArtistList, artistListVisible: true,albumListVisible:false,trackListVisible:false })

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

      this.setState({ artistListVisible: false, albumListVisible: false, trackListVisible: false, trackVisible: false, searchFeedback:'' })

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
                  this.setState({ Track, trackVisible: true })
                  console.log(this.state.Track)

              }

          })

      } catch (err) {



      }
  }

  render() {

      const { state: { loginFeedback, registerFeedback, searchFeedback, loginVisible, registerVisible, searchPanelVisible, ArtistList, AlbumList, TrackList, Track, artistListVisible, albumListVisible, trackListVisible, trackVisible }, handleLogin, handleRegister, handleSearch, goToLogin, goToRegister, Logout, LoadAlbums, LoadTracks, LoadTrack, goBackToAlbumList, goBackToArtistList, ClearLists } = this

      return <main className='app'>
          <header className="header">
              <h1>Spotifury</h1>
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

export default App;
