<template>
    <div class="forecast">
        <h3 class="forecast__title">
            Next 3 days
        </h3>
        <ul class="forecast__list">
            <li class="forecast__item" v-for="(item, key) in forecast" :key="key">
                <div class="forecast__content">
                    <div class="forecast__block">
                        <div class="forecast__value">
                            {{getDate(key).substr(0, 3)}}
                        </div>
                        <div class="forecast__label">
                        {{item.date.split('-')[1]}}/{{item.date.split('-')[2]}}                            
                        </div>
                    </div>
                    <div class="forecast__block forecast__block_image" >
                        <img :src="`https:${item.day.condition.icon}`" alt="" class="forecast__image">
                    </div>
                    <div class="forecast__block">
                        <div class="forecast__value">
                            {{item.day.mintemp_c}}
                        </div>
                        <div class="forecast__label">
                            Low                         
                        </div>
                    </div>
                    <div class="forecast__block">
                        <div class="forecast__value">
                            {{item.day.maxtemp_c}}
                        </div>
                        <div class="forecast__label">
                            Hight              
                        </div>
                    </div>
                    <div class="forecast__block">
                        <div class="forecast__value">
                            {{item.day.daily_chance_of_rain}}%
                        </div>
                        <div class="forecast__label">
                            Rain              
                        </div>
                    </div>
                    <div class="forecast__block">
                        <div class="forecast__value">
                            {{item.day.maxwind_kph}}kph
                        </div>
                        <div class="forecast__label">
                            Wind
                        </div>
                    </div>
                    <div class="forecast__block">
                        <div class="forecast__value">
                            {{item.day.avghumidity}}%
                        </div>
                        <div class="forecast__label">
                            Humidity
                        </div>
                    </div>
                </div>
                <div class="forecast__hours hours-forecast">
                    <div class="hours-forecast__item" v-for="(num, key) in 7" :key="key">
                        <div class="hours-forecast__time">
                            {{formatHours(key)}}
                        </div>
                        <div class="hours-forecast__value">
                            {{item.hour[key * 3 + 3].temp_c}}°
                        </div>
                    </div>
                </div> 
            </li>
        </ul>
    </div>
</template>
<script>

export default {
    name: 'Forecast',
    props: ['forecast'],
    methods: {
        getDate: function(key) {
            let day = new Date().getDay();
            let res = day + key
            if (res > 6){
                res -= 7
            }
            return this.$store.state.client.days[res]
        },
        formatHours: (key) => {
            key = key * 3 + 3
            let res = `${key}am`
            if(key > 10) {
                if (key > 12) {
                    key -= 12
                }
                res = `${key}pm`

            }
            return res
        }
    },
}   
</script>
<style>
    .forecast__list {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .forecast__item {
        padding: 50px;
        background-color: rgba(0,0,0,0.20);
        display: grid;
    }
    .forecast__content, .forecast__hours {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        column-gap: 40px;
    }
    .forecast__block {
        position: relative;
        z-index: 1;
    }
    .forecast__image {
        position: absolute;
        z-index: 2;
        max-width: 100%;
        left: -10px;
        top: -10px;
        background-repeat: no-repeat;
    }
    .forecast__item:not(:last-child) {
        margin-bottom: 20px;
    }
    .forecast__value {
        font-size: 20px;
        margin-bottom: 5px;
    }
    .forecast__label {
        font-size: 16px;
        color: rgba(255,255,255,0.6)
    }
    .forecast__content {
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(255,255,255,0.6);
    }
    .forecast__hours {
        padding-top: 15px;
    }
    .hours-forecast__time {
        font-size: 20px;
        margin-bottom: 10px;
    }
    .hours-forecast__value {
        color: rgba(255,255,255,0.6);
        font-size: 20px;

    }
    @media screen and (max-width: 800px) and (min-width: 700px) {
        .forecast__item {
            padding: 40px;
        }
        .forecast__value, .hours-forecast__time {
            font-size: 16px;
        }
        .forecast__label, .hours-forecast__value {
            font-size: 14px;
        }
    }
    @media screen and (max-width: 700px) and (min-width: 600px){
        .forecast__item {
            padding: 25px;
        }
        .forecast__value, .hours-forecast__time {
            font-size: 14px;
        }
        .forecast__label, .hours-forecast__value {
            font-size: 12px;
        }
        .forecast__image {
            max-width: 40px;
            top: -5px;
            left: -5px;
        }
    }
    @media screen and (max-width: 600px) {
        .forecast__item {
            padding: 50px;
        }
        .forecast__content {
            grid-template-columns: repeat(3, 1fr);
            border-bottom: none;
            padding-bottom: 0;
            row-gap: 30px;
        }
        .forecast__value {
            font-size: 30px;
        }
        .forecast__label {
            font-size: 20px;
        }
        .forecast__block_image {
            grid-row: 2;
        }
        .forecast__block:last-child {
            display: none;
        }
        .forecast__hours {
            display: none;
        }
    }
    @media screen and (max-width:400px) {
        .forecast__item {
            padding: 25px;
        }
        .forecast__value {
            font-size: 20px;
        }
        .forecast__label {
            font-size: 16px;
        }
    }
</style>