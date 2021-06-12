import axios from "axios";

export default {
    methods: {
        fetchProgrammingQuotes() {
            return axios.get(
                'http://quotes.stormconsultancy.co.uk/random.json'
            )
        },
        fetchWisdomQuotes() {
            return axios.get('https://type.fit/api/quotes')
        }
    }
}