import { defineStore } from 'pinia'
import { api } from '~/api';

export const useCountriesStore = defineStore('countries', () => {
  const countries = ref([]);

  async function fetchCountries() {
    const res = await api.get('/countries');
    countries.value = res.data.countries;
  }

  
  return {
    countries,
    fetchCountries,
  }
});