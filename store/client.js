import axios from 'axios';
export const state = () => ({
    location: {},
    days: ['Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
    error: '',
    weather: {}
})
export const actions = {
    checkCity: function({ commit }, city) {
        const router = this.$router;
        let promis = axios.get(`https://api.weatherapi.com/v1/forecast.json?key=cf424b291f6e48d5ac9182353220103&q=${city}&days=1  `)
            .then(async function(response) {
                if (response.status == 200) {
                    await router.replace({ query: { 'city': city } })
                    router.go()
                    return true
                } else this.error = 'Type another city'
            })
            .catch(() => {
                commit('changeError', 'Incorrect city')
                return false
            })
        return promis
    }
}
export const mutations = {
    changeError: (state, error) => state.error = error
}
export const getters = {
    getCurrnetDate: (state) => {
        let date = new Date()
        let result = {}
        result.dayOfWeek = state.days[date.getDay()]
        result.day = date.getDate()
        result.month = state.months[date.getMonth()]
        return result;
    },
    getError: (state) => state.error
}