const app = new Vue({
    el: '#app',
    data: {
        searchText: "",
        apiKey: "6b350ec46cfeb65b477fdc2bd01d820a",
        moviesTMDB: [],
        tvSeriesTMDB: [],
        listTMDB: []
    },
    methods: {

        /*
        fare un HTTP-request con Axios alla pressione del tasto di ricerca e passo come query la stringa searchText
        */
        clickSearch(searchType) {
            /* 
            prendo il testo di input lo concateno e formo la stringa della query                       
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

            axios.get("https://api.themoviedb.org/3/search/" + searchType, axiosOptions)
                .then((resp) => {
                    // controllo se sono movie o tvSeries e le assegno all'array corrispondente
                    // riassegno le chiavi diverse tra movies e series
                    this.mapFlagIco(resp.data.results);
                    
                    if (searchType === "movie") {
                        this.moviesTMDB = resp.data.results;
                    } else if (searchType === "tv") {
                        this.tvSeriesTMDB = resp.data.results;
                        /* 
                        rimappa i campi che mi interessa cambiare memo .map restituisce un array 
                        original_title = original_name
                        prima dell'assegnazione a seriesTMDB filtro la richiesta
                        */
                        this.seriesTMDB = resp.data.results.map((tvSerie) => {

                            this.orignal_title = this.original_name;
                            this.title = this.name;
                            
                            return tvSerie;
                        });
                    }

                    this.listTMDB = this.moviesTMDB.concat(this.tvSeriesTMDB);
                    
                });

        },

        /*
        le API restituiscono la stringa per la lingua (results.original_language), occorre mapparla all' identificativo del paese
        */
        mapFlagIco(movie) {

            // mappatura tra stato e lingua --> per ricavare la bandiera corretta
            // const lang2country = {
            //     'en': ['gb', 'us', 'ca'],
            //     'es': ['es', 'ar' ],

            // }

            // scelgo una bandiera che usero' in caso non trovassi quelle che cercavo "en" di default
            // const fallbackFlag = 'en';

            // ottengo la lingua di cui voglio trovare le bandiere dei country associati
            // const queryLang = this.original_language;

            /*
             cerco le bandiere a partire dalla mappa e le salvo per essere usate successivamente
             Object.keys() restituisce un array con tutte le chiavi contenute nell'oggetto
             se la chiave è contenuto nella mappatura assegno il valore corrispondente a candidatesCountries altrimenti la bandiera di default
            */
            //  const candidatesCountries = Object.keys(lang2country).includes(queryLang) ? lang2country[myLang] : [fallbackFlag]

            // ALTRA SOLUZIONE PER LE BANDIERE

            const lang2country = {
                en: 'us',
                es: 'es'

            };

            // se esiste in lang2country restituisce la stringa per la lingua corrispondente
            // altrimenti rimane original_language
            if (lang2country[movie.original_language]) {
                return lang2country[movie.original_language]
            } else {
                return movie.original_language;
            }
        },

        // creo un array che determina il numero di stelle piene e vuote
        getMovieStars(movie) {
            // per avere 5 stelle da vote_average  0 - 10
            const movieVote = Math.round(movie.vote_average / 2);
            const starArray = []

            // pusha nell'array fino all'intero arrotondato per difetto del voto medio es: 4.7 --> 4 
            for (let i = 1; i <= 5; i++) {
                starArray.push(i < movieVote);
            }

            // arrey di booleani se la stella sarà piena (true) o vuota (false)
            return starArray;
        },

        // ritorna il poster del film/serie altrimenti uno di default 185 tra le grandezze disponibili
        getImgSrc(movie) {
            if (movie.poster_path) {
                return `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
            } else {
                // immagine locale sostitutiva
                return "img/image-unavailable.png"
            }
        },

        search(){
            this.clickSearch("movie");
            this.clickSearch("tv");   
            // this.mapFlagIco()
            // quando mi restituisce undefined controllo anche l'invocazione
        }

    },
})