<template>
    <main class="container text-white">
        <div class="pt-4 mb-8 relative">
            <input type="text" v-model="searchQuery" @input="getSearchResults" placeholder="Search for a City" class="py-2 px-1 w-full bg-transparent border-b 
            focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]" />
            <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
                v-if="mapboxSearchResult">
                <li v-for="searchResult in mapboxSearchResult" :key="searchResult.id" class="py-2 cursor-pointer">
                    {{ searchResult.place_name }}
                </li>
            </ul>
        </div>
    </main>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const mapboxPublicKey = "pk.eyJ1IjoicjR5ejB4IiwiYSI6ImNtZHQyeTYzNjB5dmIyd3F2bWx2dXZ3MmYifQ.U57YAz_DlkU0oyO5Yq-heg";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResult = ref(null);

const getSearchResults = () => {
    clearTimeout(queryTimeout.value);
    queryTimeout.value = setTimeout(async () => {
        if (searchQuery.value !== '') {
            const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxPublicKey}&types=place`);
            mapboxSearchResult.value = result.data.features;
            return;
        }
        mapboxSearchResult.value = null;
    }, 300);
}
</script>
