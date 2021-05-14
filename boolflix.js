const app = new Vue({
    el:'#app',
    data: {
        searchText: "",
        apiKey: "6b350ec46cfeb65b477fdc2bd01d820a",
        arrayTMDB: []
    },
    methods: {
        /*
        fare un HTTP-request con Axios
        alla pressione del tasto di ricerca come query la 
        stringa searchText
        */
        clickSearch() {
            /* prendo il testo di input lo concateno e formo la stringa della query
             
            
            /*
             un oggetto per i paramentri della axios.get()
             dovrò concatenare in qualche modo la stringa passata in input con la query 
            */
            const axiosOptions = {
                params: {
                    api_key: this.apiKey,
                    query: this.searchText,
                }
            } 

            axios.get("https://api.themoviedb.org/3/search/movie",axiosOptions)
            .then((resp) => {
                this.arrayTMDB = resp.data.results
            })    
            
            
        }

    },
})