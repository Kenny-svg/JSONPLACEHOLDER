<script>
// import AddPhoto from '../../components/photo/AddPhoto.vue';

import PhotoDetails from '../../components/photos/PhotoDetails.vue';
import {usePhotoStore } from '../../store/PhotoStore'
import AddPhoto from '../../components/photos/AddPhoto.vue';
export default {
    components: {PhotoDetails, AddPhoto },
    setup() {
        const photoStore = usePhotoStore()

        //fetching the photos

        photoStore.getphotos()

        return {photoStore}
    }
}
</script>
<template>
    <!-- error -->
    <div v-if="photoStore.error">{{ photoStore.error }}</div>
    <!-- add photos -->
    <div class="mt-20 text-center">
        <AddPhoto  />
    </div>
     <!-- photo details -->
     <div class="mt-10 text-center font-bold text-3xl mb-5">photos[{{ photoStore.photosTotals }}]</div>
         <!-- loading -->
    <div v-if="photoStore.loading">loading photo...</div>
     <div class="" v-for="photo in photoStore.photos" :key="photo.id">
        <PhotoDetails :photo="photo" />
     </div>

</template>