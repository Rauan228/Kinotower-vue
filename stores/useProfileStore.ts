import { defineStore } from 'pinia'
import { api } from '~/api';

export const useProfileStore = defineStore('profile', () => {
    const userData = ref(null);
    const reviewsData = ref([]);
    const ratingsData = ref([]);
    const favoritesData = ref([]);
    const authStore = useAuthStore();
  
    async function fetchUserData(id: number) {
      const res = await api.get(`/users/${id}`, {
        headers: {
          'Authorization':'Bearer '+ authStore.authData.token,
        }
      });
      userData.value = res.data;
    }

    async function fetchReviewsData() {
      const res = await api.get(`/users/${authStore.authData.id}/reviews`, {
        headers: {
          'Authorization':'Bearer '+ authStore.authData.token,
        }
      });
      reviewsData.value = res.data.reviews;
    }

    async function fetchRatingsData() {
      const res = await api.get(`/users/${authStore.authData.id}/ratings`, {
        headers: {
          'Authorization':'Bearer '+ authStore.authData.token,
        }
      });
      ratingsData.value = res.data.ratings;
    }

    async function fetchFavoritesData() {
      const res = await api.get(`/users/${authStore.authData.id}/favorites`, {
        headers: {
          'Authorization':'Bearer '+ authStore.authData.token,
        }
      });
      favoritesData.value = res.data.favorites;
    }



    async function updateProfile(fio: string, email:string, birthday:string, gender_id:number) {
      const res = await api.put(`/users`, {
        fio, 
        email, 
        birthday, 
        gender_id,
      }, {
        headers: {
          'Authorization':'Bearer '+ authStore.authData.token,
        }
      });

    }

    async function removeReviewsData(id: number) { 
      await api.delete(`/users/${authStore.authData.id}/reviews/${id}`, { 
       headers: { 
        Authorization: 'Bearer ' + authStore.authData.token, 
       }, 
      }); 
     
      await fetchReviewsData(); 
     } 
     
     async function removeRatingsData(id: number) { 
      await api.delete(`/users/${authStore.authData.id}/ratings/${id}`, { 
       headers: { 
        Authorization: 'Bearer ' + authStore.authData.token, 
       }, 
      }); 
     
      await fetchRatingsData(); 
     }

     
  async function removeFavoritesData(id: number) {
    await api.delete(`/users/${authStore.authData.id}/favorites/${id}`, { 
      headers: { 
       Authorization: 'Bearer ' + authStore.authData.token, 
      }, 
     }); 

    await fetchFavoritesData();
  }



    

    fetchReviewsData();
    fetchRatingsData();
    fetchFavoritesData();
 

    return {
      userData,
      reviewsData,
      ratingsData,
      favoritesData,

      fetchUserData,
      updateProfile,
      removeReviewsData,
      removeRatingsData,
      fetchReviewsData,
      fetchFavoritesData,
      removeFavoritesData
    }
});