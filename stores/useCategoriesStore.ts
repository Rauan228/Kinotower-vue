import { defineStore } from 'pinia'
import { api } from '~/api';

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref([]);

  async function fetchCategories() {
    const res = await api.get('/categories');
    categories.value = res.data.categories;
  }

  
  return {
    categories,
    fetchCategories,
  }
});
