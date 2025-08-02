<template>
    <main class="container text-white">
        <div class="pt-4 mb-8 relative">
            <input type="text" v-model="searchQuery" @input="getSearchResults" placeholder="Search for a City" class="py-2 px-1 w-full bg-transparent border-b 
            focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]" />
            <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
                v-if="mapboxSearchResult">
                <p v-if="searchError">Sorry, something went wrong, please try again.</p>
                <p v-if="!serverError && mapboxSearchResult.length === 0">
                    No results match your query, try a different term.
                </p>
                <template v-else>
                    <li v-for="searchResult in mapboxSearchResult" :key="searchResult.id" class="py-2 cursor-pointer"
                        @click="previewCity(searchResult)">
                        {{ searchResult.place_name }}
                    </li>
                </template>
            </ul>
        </div>
    </main>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const previewCity = (searchResult) => {
    console.log(searchResult);
    const [city, state] = searchResult.place_name.split(",");
    router.push({
        name: "cityView",
        params: { state: state.replaceAll(" ",""), city: city },
        query: {
            lat: searchResult.geometry.coordinates[1],
            lng: searchResult.geometry.coordinates[0],
            preview: true,
        }
    });
};

const mapboxPublicKey = "pk.eyJ1IjoicjR5ejB4IiwiYSI6ImNtZHQyeTYzNjB5dmIyd3F2bWx2dXZ3MmYifQ.U57YAz_DlkU0oyO5Yq-heg";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResult = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
    clearTimeout(queryTimeout.value);
    queryTimeout.value = setTimeout(async () => {
        if (searchQuery.value !== '') {
            try {
                const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxPublicKey}&types=place`);
                mapboxSearchResult.value = result.data.features;
            } catch {
                searchError.value = true;
            }
            return;
        }
        mapboxSearchResult.value = null;
    }, 300);
}
</script>
