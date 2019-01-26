const logic ={

searchArtist(query,callback){

if(typeof query !== 'string') throw TypeError (`${query} is not a string`)
if(!query.trim().length) throw Error(`query is empty`)
if(typeof callback !== 'function') throw TypeError (`${callback} is not a function`)


spotidyApi.searchArtist(query,callback);



}


}