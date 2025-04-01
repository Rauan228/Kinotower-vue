import { defineStore } from 'pinia'
import { api } from '~/api';

export const useFilmsStore = defineStore('films', () => {
  const films = ref([]);
  const page = ref(1);
  const total = ref(0);
  const isLoading = ref(true);
  const size = 4;
  const authStore = useAuthStore();

  const params: {
    category: number|null,
    country:  number|null,
    sortBy: string,
    sortDir: string,
    size: number,
    page: number,
  } = {
    category: null,
    country: null,
    sortBy: 'name',
    sortDir: 'desc',
    page: page.value,
    size
  };
  
  function changePage(pages:number) {
    page.value = pages;
    params.page = pages;
    fetchFilms();
  }

  function addSortToParams(sortBy: string) {
    params.sortBy = sortBy;
    fetchFilms();
  }

  function addCountryToParams(country:number|null) {
    params.country = country;
    page.value = 1;
    params.page = 1;
    fetchFilms();
  }

  function addCategoryToParams(category:number|null) {
    params.category = category;
    page.value = 1;
    params.page = 1;
    fetchFilms();
  }

  async function fetchFilms() {
    isLoading.value = await api.get('/films', {params});
    isLoading.value = false;
    const response = await api.get('/films', {params});
    films.value = response.data.films;
    total.value = response.data.total;
  }

  async function likeFilm(film_id:string, like:number) {
    const res = await api.post(`users/${authStore.authData.id}/favorites`, {
      film_id,
      like,
    }, {
      headers: {
        'Authorization' : 'Bearer ' + authStore.authData.token,
      }
    });

  }


  return {
    films, 
    fetchFilms,
    addCategoryToParams,
    addCountryToParams,
    addSortToParams,
    total,
    size,
    page,
    changePage,
    isLoading,
    likeFilm,

  }
})
