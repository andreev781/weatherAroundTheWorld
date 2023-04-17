<template>
    <div class="current">
        <div class="current__top">
            <div class="current__title">
                <h1>{{location.region}}, {{location.country}}</h1>
                <span class="current__date">
                    {{currentDate.dayOfWeek}},
                    {{currentDate.day}}th
                    {{currentDate.month}}
                </span>
            </div>
            <div class="current__change">
                <input type="text" @focus="error = ''" class="current__input" @keypress="isLetter($event)" @keyup.enter="changeCity" v-model="otherCity" placeholder="Type your city..">
                <span v-if="error" class="error current__error">{{error ? error : ''}}</span>
                 <button class="current__button" @click="changeCity">Change city</button>
            </div>
        </div>

        <div class="current__main">
            <div class="current__block">
            <img :src="`https:${currentWeather.condition.icon}`" alt="img">
                <div class="current__conditionals">
                    <div class="current__value">
                        {{currentWeather.temp_c}}°
                    </div>
                    <div class="current__summary">
                        {{currentWeather.condition.text}}
                    </div>
                </div>

            </div>
            <div class="current__block">
                <ul class="current__stats stats-current">
                    <li class="stats-current__item">
                        <div class="stats-current__value">
                            {{currentWeather.feelslike_c}}°
                        </div>
                        <div class="stats-current__label">
                            Feels like
                        </div>
                    </li>
                    <li class="stats-current__item">
                        <div class="stats-current__value">
                            {{currentWeather.pressure_mb}}mm
                        </div>
                        <div class="stats-current__label">
                            Pressure
                        </div>
                    </li>
                    <li class="stats-current__item">
                        <div class="stats-current__value">
                            {{currentWeather.wind_kph}}kph
                        </div>
                        <div class="stats-current__label">
                            Wind
                        </div>
                    </li>
                    <li class="stats-current__item">
                        <div class="stats-current__value">
                            {{currentWeather.precip_mm}}%
                        </div>
                        <div class="stats-current__label">
                            Precip
                        </div>
                        </li>
                    <li class="stats-current__item">
                        <div class="stats-current__value">
                            {{currentWeather.humidity}}
                        </div>
                        <div class="stats-current__label">
                            Humidity
                        </div>
                    </li>
                    <li class="stats-current__item">
                        <div class="stats-current__value">
                            {{currentWeather.cloud}}
                        </div>
                        <div class="stats-current__label">
                            Cloud
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'current',
    props: ['location', 'currentWeather'],
    data(){
        return{
            otherCity: '',
            error: ''
        }
    },
    methods: {
        isLetter(e){
            let char = String.fromCharCode(e.keyCode);
            if (/^[A-Za-z\s+]$/.test(char)) return true;
            else e.preventDefault();
        },
        changeCity(){
            if (!this.otherCity) this.error = ('Type your city');
            else {
                this.$store.dispatch('client/checkCity', this.otherCity)
                .then(res => res ? '' : this.error = this.$store.getters['client/getError'])
            }
        },
    },
    computed: {
        ...mapGetters({
            currentDate: 'client/getCurrnetDate'
        })
    }
}
</script>
<style scoped>
    .current__top {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
    }
    .current__title h1 {
        font-size: 30px;
        margin: 0;
        margin-bottom: 10px;
    }
    .current__change {
        display: grid;
    }
    .current__input {
        margin-bottom: 10px;
        padding: 8px 5px;
        outline: none;
    }
    .current__button {
        display: block;
        margin-bottom: 10px;
        padding: 5px 10px;
        outline: none;
        background: transparent;
        box-shadow: none;
        border: 1px solid #c4c4c4;
        color: #fff;
        cursor: pointer;

    }
    .current__date {
        font-size: 20px;
    }
    .current__block img {
        width: 150px;
        height: 150px;
    }
    .current__main {
        display: flex;
        justify-content: space-between;
    }
    .current__block {
        display: flex;
        align-items: center;
    }
    .current__conditionals {
        margin-left: 50px;
    }
    .current__value {
        font-size: 55px;
    }
    .current__summary {
        font-size: 23px;
    }
    .current__error {
        margin-top: -5px;
        margin-bottom: 5px;
    }
    .stats-current {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding-left: 0;
        row-gap: 30px;
        column-gap: 80px;
        list-style: none;
    }
    .stats-current__value {
        font-size: 25px;
        margin-bottom: 10px;
    }
    .stats-current__label {
        font-size: 20px;
        color: rgba(255,255,255,0.6);
    }
    .current__block:last-child {
        border-left: 1px solid rgba(255,255,255,0.6);
        padding-left: 60px ;
    }
    @media (min-width: 700px) and (max-width: 800px) {
        .current__value {
            font-size: 40px;
        }
        .current__summary {
            font-size: 16px;
        }
        .current__block img {
            width: 100px;
            height: 100px;
        }
    }
    @media screen and (max-width: 700px) {
        .current__main {
            flex-direction: column;
            justify-content: start;
            align-items: center;
        }
        .current__block {
            width: 100%;
            justify-content: space-around;
        }
        .current__block:last-child {
            padding-left: 0;
            border: none;
            border-top: 1px solid rgba(255,255,255,0.6);
        }
        .current__block img {
            margin-left: -5px;
        }
    }
    @media screen and (max-width: 500px) {
        .current__title h1 {
            font-size: 25px;
        }
        .current__date {
            font-size: 16px;
        }
        .stats-current {
            column-gap: 60px;
        }
        .stats-current__value {
            font-size: 20px;
        }
        .stats-current__label {
            font-size: 16px;
        }
        .current__input {
            font-size: 10px;
        }
        .current__change {
            margin-left: 10px;
        }
    }
    @media screen and (max-width: 400px) {
        .current__title h1{
            font-size: 20px;
        }
        .current__date {
            font-size: 15px;
        }
        .current__input {
            padding: 4px 3px;
        }
        .current__summary {
            font-size: 18px;
        }
        .stats-current__value {
            font-size: 18px;
            margin-bottom: 5px;
        }
        .stats-current {
            column-gap: 35px;
        }
    }
</style>