<script>
// import AddComment from '../../components/comment/AddComment.vue';
import CommentDetails from '../../components/comment/CommentDetails.vue';
import {useCommentStore } from '../../store/CommentStore'
import AddComment from '../../components/comment/AddComment.vue';
import { ref, computed } from '@vue/reactivity';
import { onMounted, onUnmounted,} from 'vue';

export default {
    components: {AddComment,CommentDetails},
    setup() {
        const commentStore = useCommentStore()

        //fetching the comments

        commentStore.getComments()

        const page = ref(1);
        const itemsPerPage = 10;
        const totalPages = computed(() => Math.ceil(commentStore.comments.length / itemsPerPage));
        const paginatedComments = computed(() => {
        const start = (page.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return commentStore.comments.slice(start, end);
        });
        const prevPage = () => {
        if (page.value > 1) {
            page.value--;
        }
        };
        const nextPage = () => {
        if (page.value < totalPages.value) {
            page.value++;
        }
        };
        const showArrow = ref(false);
          const handleScroll = () => {
            if (window.scrollY > 300) {
              showArrow.value = true;
            } else {
              showArrow.value = false;
            }
      };
        const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };

      onMounted(() => {
        window.addEventListener('scroll', handleScroll);
      });
      onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
      });


        return {
            commentStore,
            paginatedComments,
            prevPage,
            nextPage,
            totalPages,
            page,
            showArrow,
            handleScroll,
            scrollToTop,
    };
    }
}
</script>
<template>
      <!-- loading -->
<div v-if="commentStore.loading" class="bg-blue-900 absolute top-0 h-full w-full text-center text-gray-600"><div class="flex items-center h-screen">
  <div class="bg-blue-500 w-64 h-10 mx-auto rounded-full animate-wipe">
  </div>
</div></div>
  <div v-if="commentStore.error">{{ commentStore.error }}</div>
  <div class="mt-24 text-center">
    <AddComment />
  </div>
  <div class=" mt-10 text-center font-bold text-3xl mb-5">
    comments<sub>[{{ commentStore.commentsTotals }}]</sub>
  </div>
  <div v-if="commentStore.loading">loading comment...</div>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 w-11/12 mx-auto">
    <div class="" v-for="comment in paginatedComments" :key="comment.id">
    <commentDetails :comment="comment" />
  </div>
  </div>
  <div class="text-center mt-5">
    <button  class="bg-gray-300 text-gray-700 border-2 rounded-lg px-4 py-2 hover:bg-gray-400"  @click="prevPage">Prev</button>
    <template v-for="i in Array.from({length: this.totalPages}, (_, index) => index + 1)" :key="i">
      <button class="border-2 ml-2 w-5 bg-gray-300 text-gray-700 hover:bg-gray-400" v-if="i <= 5 || i >  this.totalPages - 5" @click="this.page = i">{{ i }}</button>
      <template v-if="i === 6">...</template>
    </template>
    <button  class="bg-gray-300 text-gray-700 border-2 rounded-lg px-4 py-2 hover:bg-gray-400"  @click="nextPage">Next</button>
  </div>

  <div class="scroll-to-top" v-if="showArrow" @click="scrollToTop">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-18 h-8 bg-gray-900 text-white rounded-full cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg>

    </div>
</template>
<style scoped>
  .scroll-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    opacity: 0.5;
  }
</style>