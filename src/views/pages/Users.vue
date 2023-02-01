<script>
import UserDetails from '../../components/users/UserDetails.vue';
import { useUserStore } from '../../store/UserStore';
export default {
    components: {UserDetails},
    setup() {
        const userStore = useUserStore()

        //fetching the users

        userStore.getUsers()

        return {userStore}
    }
}
</script>
<template>
    <!-- error -->
    <div v-if="userStore.error">{{ userStore.error }}</div>
     <!-- user details -->
     <div class="mt-20">users [{{ userStore.userTotals }}]</div>

     <!-- loading -->
     <div v-if="userStore.loading">loading users...</div>
     <div class="" v-for="user in userStore.users" :key="user.id">
     <userDetails :user="user" />
     </div>
</template>