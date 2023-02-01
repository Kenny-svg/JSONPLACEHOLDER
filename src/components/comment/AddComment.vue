<template>
    <!-- loading -->
    <div v-if="commentStore.loading">loading comment...</div>
    <div>{{ commentStore.error }}</div>
     <!-- comment details -->
     <div class="mt-20">comments[{{ commentStore.commentsTotals }}]</div>
     <div class="" v-for="comment in commentStore.comments" :key="comment.id">
        <CommentDetails :comment="comment" />
     </div>
</template>
<script>
import {useCommentStore} from '../../store/CommentStore'
import AddComment from '../../components/comment/AddComment.vue'
import CommentDetails from './CommentDetails.vue';

export default {
    components: {AddComment, CommentDetails},

    setup() {
        const commentStore = useCommentStore()

        //fetching the comments
        commentStore.commentStore()
        return {commentStore}
    }
}
</script>