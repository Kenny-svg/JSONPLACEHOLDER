<script>
import PostDetails from '../../components/posts/PostDetails.vue';
import { usePostStore } from '../../store/PostStore';

export default {
    components: {PostDetails},
    setup() {
        const postStore = usePostStore()

        //fetching the posts

        postStore.getPosts()

        return {postStore}
    }
}
</script>
<template>
    <!-- error -->
    <div v-if="postStore.error">{{ postStore.error }}</div>
     <!-- post details -->
     <div class="mt-20">Posts [{{ postStore.postTotals }}]</div>

     <!-- loading -->
     <div v-if="postStore.loading">loading posts...</div>
     <div class="" v-for="post in postStore.posts" :key="post.id">
     <PostDetails :post="post" />
     </div>
</template>