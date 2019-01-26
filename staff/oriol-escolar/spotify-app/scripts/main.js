const searchPanel = new SearchPanel;
const artistsPanel = new ArtistsPanel;

const $root = $('#root')


$root.append(searchPanel.$container)
$root.append(artistsPanel.$container)



searchPanel.onSearch = function (query) {

    try {

        logic.searchArtists(query, function (error, artists) {
            if (error) {
            searchPanel.error = error
            } else {

                artistsPanel.artists = artists;

            }



        })

    } catch (err) {



    }


}