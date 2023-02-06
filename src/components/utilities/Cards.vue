<template>
    <div class="grid md:grid-cols-3 grid-cols-1 gap-4 m-10">
        <router-link :class="{'active': $route.path === '/albums'}" to="/albums" >
            <div class="text-center border-2 shadow-xl hover:shadow-2xl border-x-gray-400 bg-white w-full cursor-pointer rounded-md">
            <h1 class="font-bold text-2xl mt-5 mb-5">Albums</h1>
            <img class="object-cover p-5 w-60 h-40 ml-5 md:h-48 md:w-80 md:ml-10 mb-5" src="../../assets/images/albums.svg" />
            <p class="underline mb-5">Check Memories made</p>
        </div>
        </router-link>
        <router-link :class="{'active': $route.path === '/comments'}" to="/comments" >
            <div class="text-center border-2 shadow-xl hover:shadow-2xl border-x-gray-400 bg-white w-full cursor-pointer rounded-md">
            <h1 class="font-bold text-2xl mt-5 mb-5">Comments</h1>
            <img class="object-cover p-5  h-48 w-80 md:ml-10 mb-5" src="../../assets/images/comment.svg" />
            <p class="underline mb-5">What do you think?</p>
        </div>
        </router-link>
        <router-link :class="{'active': $route.path === '/photos'}" to="/photos" >
            <div class="text-center border-2 shadow-xl hover:shadow-2xl border-x-gray-400 bg-white w-full cursor-pointer rounded-md">
            <h1 class="font-bold text-2xl mt-5 mb-5">Photos</h1>
            <img class="object-cover p-5 h-48 w-80 md:ml-10 mb-5" src="../../assets/images/photo.svg" />
            <p class="underline mb-5">Let's take more.</p>
        </div>
        </router-link>
    </div>
    <div class="grid md:grid-cols-3 grid-cols-1 gap-4 m-10">
        <router-link :class="{'active': $route.path === '/posts'}" to="/posts">
            <div class="text-center border-2 shadow-xl hover:shadow-2xl border-x-gray-400 bg-white w-full cursor-pointer rounded-md">
            <h1 class="font-bold text-2xl mt-5 mb-5">Posts</h1>
            <img class="object-cover p-5 h-48 w-80 md:ml-10 mb-5" src="../../assets/images/posts.svg" />
            <p class="underline mb-5">Writing clears the mind.</p>
        </div>
        </router-link>
        <router-link :class="{'active': $route.path === '/todos'}" to="/todos" >
            <div class="text-center border-2 shadow-xl hover:shadow-2xl border-x-gray-400 bg-white w-full cursor-pointer rounded-md">
            <h1 class="font-bold text-2xl mt-5 mb-5">Todos</h1>
            <img class="object-cover p-5 h-48 w-80 md:ml-10 mb-5" src="../../assets/images/todos.svg" />
            <p class="underline mb-5">Check your checklist.</p>
        </div>
        </router-link>
        <router-link  :class="{'active': $route.path === '/users'}" to="/users"  >
            <div class="text-center border-2 shadow-xl hover:shadow-2xl border-x-gray-400 bg-white w-full cursor-pointer rounded-md">
            <h1 class="font-bold text-2xl mt-5 mb-5">Users</h1>
            <img class="object-cover p-5 h-48 w-80 md:ml-10 mb-5" src="../../assets/images/users.svg" />
            <p class="underline mb-5">What's on the platform?</p>
        </div>
        </router-link>

    </div>
</template>