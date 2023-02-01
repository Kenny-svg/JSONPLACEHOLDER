<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4" >
           <div class="bg-white shadow-2xl border-2">
                <p>{{ user.id }}</p>
                <h3>{{ user.name }}</h3>
                <h3>{{ user.username }}</h3>
                <h3>{{ user.email }}</h3>
                <p>{{ user.address[0] }}</p>
                <p>{{ user.phone }}</p>
                <p>{{ user.website }}</p>
           </div>
        </div>
    </template>
    <script>
    import {useUserStore} from '../../store/UserStore';
    export default {
        props: ['user'],
        setup() {
            const userStore = useUserStore();
    
            
            return {userStore,}
        }
    }
    </script>