import { ref } from '@vue/reactivity'

const getImages = () => {
    const images = ref('')
    const error = ref(null)
    

    const load = async () => {
        try {
            let data = await fetch('https://source.unsplash.com/random')
            if (!data.ok) 
            {
                throw Error('item does not exist')
            }
            images.value = await data.json()
        } catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }
    return {images, error, load}
}
export default getImages