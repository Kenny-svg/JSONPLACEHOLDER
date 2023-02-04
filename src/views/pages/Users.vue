<script>
import UserDetails from '../../components/users/UserDetails.vue';
import { useUserStore } from '../../store/UserStore';
import AddUser from '../../components/users/AddUser.vue';
export default {
    components: {UserDetails, AddUser},
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
     <!-- add user -->
     <div class="mt-20 text-center">
        <AddUser  />
    </div>
     <!-- user details -->
     <div class="mt-10 text-center font-bold text-3xl mb-5">users [{{ userStore.userTotals }}]</div>

     <!-- loading -->
     <div v-if="userStore.loading">loading users...</div>
     <div class="" v-for="user in userStore.users" :key="user.id">
     <userDetails :user="user" />
     </div>
</template>