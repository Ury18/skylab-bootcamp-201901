'use strict';

/**
 * Duckling API client.
 * 
 * @version 1.0.0
 */
const spotifyApi = {
    /**
     * Searches ducklings.
     * 
     * @param {string} query - The text to match on search.
     * @param {function} callback - The expression to evaluate on response. If error first 
     * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching 
     * results.
     */
    search(query, callback) {
        $.getJSON(`https://api.spotify.com/v1/search?q= ${query}&type=artist`, {
            method: 'GET',
            headers: {


                authorization: 'BQBMqGOxfS3LBDrY-IYD1VB10LZ49Jz3E2IElKUyKudRQGb77PxQkSvqnRFGQ7bPOW10IvHg-acbmaPXBBVqaf3MlQ5tnaKDRP5CAFfVyC9p_cHRHpT_lpgKYuQtkd5ylHrVEoZvXPrzcg'
            }

        })

        .then(res=> res.json())
        .then (({artists:{item}}) => callback(undefined,item))


    }
}
