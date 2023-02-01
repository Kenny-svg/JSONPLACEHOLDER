<template>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4" >
       <div class="bg-white shadow-2xl border-2">
            <p>{{ post.id }}</p>
            <h3>{{ post.body }}</h3>
       </div>
    </div>
</template>
<script>
import {usePostStore} from '../../store/PostStore';

export default {
    props: ['post'],
    setup() {
        const postStore = usePostStore();

        return {postStore}
    }
}
</script>