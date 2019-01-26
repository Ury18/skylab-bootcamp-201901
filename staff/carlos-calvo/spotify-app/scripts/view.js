class Panel {
    constructor($container) {
        this.$container = $container
    }

    show() {
        this.$container.show()
    }

    hide() {
        this.$container.hide()
    }
}


//Class prefix	.col-	.col-sm-	.col-md-	.col-lg-	.col-xl-
class SearchPanel extends Panel {
    constructor() {
        super($(`<section class=" rounded search container text-dark .col-sm-12 .col-md-10 .col-lg-8 .col-xl-6 justify-content-center">
        <h2>Search</h2>
        <form>
            <div class= "row justify-content-center">
                <div class="input-group mb-1 .col-sm-8 .col-md-8 .col-lg-6 .col-xl-6">
                    <div class="input-group-prepend .col-sm-5 .col-md-5 .col-lg-5 .col-xl-5 ">
                        <span class="input-group-text col-12" id="basic-addon1">Spotify</span>
                    </div>
                    <input type="text" class="form-control .col-sm-5 .col-md-5 .col-lg-5 .col-xl-5" placeholder="Search on Spotify" aria-label="Username" aria-describedby="basic-addon1">
                </div>
                <button type="submit" class="btn btn-primary .col-sm-5">Search</button>
            </div>

            
        </form>
</section>`))

        this.__$form__ = this.$container.find('form')
        this.__$query__ = this.__$form__.find('input')
    }

    set onSearch(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault()
            const query = this.__$query__.val()
            callback(query)
        })
    }
}










class ArtistsPanel extends Panel {
    constructor() {
        super($(`<section class=" rounded results artistpanel container col-6 rounded-right card text-white bg-dark mb-3">
    <h3>Artists</h3>
    <ul class="list-group list-group-flush"></ul>
</section`))

        this.__$list__ = this.$container.find('ul')
    }

    set artists(artists) {
        artists.forEach(({ id, name }) => {
            const $item = $(`<li class="artist list-group-item list-group-item-primary" data-id=${id}>${name}</li>`)
            this.__$list__.append($item)


            $item.click(() => {
                const id = $item.data('id')
                this.__onArtistSelectedCallback__(id)
            })
        })
    }

    set onArtistClicked(callback){
        this.__onArtistSelectedCallback__ = callback
    }

    focusOnItem(id){
        this.__$listli__ = $('li')

        for(var i = 0; i < this.__$listli__.length; i++){
            if($(this.__$listli__.eq(i)).data('id') == id){
                $(this.__$listli__.eq(i)).css({"color": "red", "border": "2px solid red"})
            }
        }
    }
    clearstyles(){
        $('.artist').css('color', 'black')
        $('.artist').css('border', '0')
    }
    clear(){
        this.__$list__.html('')
    }

    getImageURL(array, id){
        //return array[i]['preview_url']
        for(var i = 0; i < array.length; i++){
            if(array[i]['id'] == id){
                return array[i]['images'][0]['url']
             }
        }
    }
}












class AlbumPanel extends Panel {
    constructor(){
        super($(`<section class=" rounded results container text-dark albumpanel justify-content-between col-6 bg-info text-white">
    <h3>Albums</h3>
    <ul class="list-group list-group-flush"></ul>
</section`))
        this.__$title__= this.$container.find('h3')
        this.__$list__ = this.$container.find('ul')
    }

    set albums(albums){
        albums.forEach(({ id, name }) => {
            const $item = $(`<li class="album list-group-item list-group-item-success" data-id=${id}>${name}</li>`)
            this.__$list__.append($item)

            $item.click(() => {
                const id = $item.data('id')
                $item.css({"color": "blue"})
                this.__onAlbumSelectedCallback__(id)
            })
        })
    }
    set onAlbumClicked (callback){
        this.__onAlbumSelectedCallback__ = callback
    }

    focusOnItem(id){
        this.__$listli__ = $('li')

        for(var i = 0; i < this.__$listli__.length; i++){
            if($(this.__$listli__.eq(i)).data('id') == id){
                $(this.__$listli__.eq(i)).css({"color": "blue", "border": "2px solid blue"})
            }
        }
    }

    clearstyles(){
        $('.album').css('color', 'black')
        $('.album').css('border', 'none')
    }

    clear(){
        this.__$list__.html('')
    }
}









class SongPanel extends Panel{
    constructor(){
        super($(`<section class="rounded results container songPanel col-6 bg-info text-white text-dark justify-content-md-center align-items-center">
            <h3>Songs</h3>
            <ul class="list-group list-group-flush"></ul>
        </section`))
        this.__$list__ = this.$container.find('ul')
    }

    set songs(songs){
        songs.forEach(({ id, name }) => {
            const $item = $(`<li class="song list-group-item list-group-item-warning" data-id=${id}>${name}</li>`)
            this.__$list__.append($item)

            $item.click(() => {
                const id = $item.data('id')
                this.__onSongselectedCallback__(id)
            })
        })
    }

    set onSongClicked (callback){
        this.__onSongselectedCallback__ = callback
    }


    focusOnItem(id){
        this.__$listli__ = $('li')

        for(var i = 0; i < this.__$listli__.length; i++){
            if($(this.__$listli__.eq(i)).data('id') == id){
                $(this.__$listli__.eq(i)).css({"color": "orange", "border": "2px solid orange"})
            }
        }
    }

    clear(){
        this.__$list__.html('')
    }

    clearstyles(){
        $('.song').css('color', 'black')
        $('.song').css('border', 'none')
    }

    retrievesongId(array, id){
        for(var i = 0; array.length; i++){
             if(array[i]['id'] == id){
                return array[i]['preview_url']
             }
        }
    }

}

class Mp3Player extends Panel{
    constructor(){
        super($(`<section class="results container mp3Panel col-6 bg-info text-dark">
            <h2 class="tituloamarillo">Player</h2>
            <img width="50%" height ="40%">
            <audio controls autoplay></audio>
        </section`))
    }

    set Song(track){
        const audio = document.getElementsByTagName('audio')[0]
        audio.setAttribute("src", track);
    }

    stopAudio(){
        const audiotrack = document.getElementsByTagName('audio')[0]
        audiotrack.pause()
    }

    set setImageAlbum(source){
        const image = document.getElementsByTagName('img')[0]
        image.setAttribute("src", source);
    }


}


class ErrorPanel extends Panel{

    constructor(){
        super($(`<section class="p-1 alert alert-warning card-text"></section>`))
    }
    set message(message) {
        this.$container.text(message)
    }

}
