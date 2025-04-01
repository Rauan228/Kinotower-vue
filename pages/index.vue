<script lang="ts" setup>

const filmsStore = useFilmsStore();
const categoriesStore = useCategoriesStore();
const countriesStore = useCountriesStore();
const authStore = useAuthStore();


const category = ref(null);
watch(category, (newCategory) => {
  filmsStore.addCategoryToParams(newCategory);
});

const country = ref(null);
watch(country, (newCountry) => {
  filmsStore.addCountryToParams(newCountry);
});

const sortBy = ref('name');
watch(sortBy, (newSortBy) => {
  filmsStore.addSortToParams(newSortBy);
});


const resetParams = () => {
  category.value = null;
  country.value = null;
  sortBy.value = 'name';
  filmsStore.fetchFilms();
}

filmsStore.fetchFilms();
categoriesStore.fetchCategories();
countriesStore.fetchCountries();
</script>

<template>
  <template v-if="filmsStore.films">
    <div class="row mb-3">
      <div class="col-md-4">
        <select class="form-select" aria-label="Default select example" v-model="category">
          <option selected :value="null">Выберите жанр...</option>
          <option v-for="category in categoriesStore.categories" :key="category.id" :value="category.id">
            {{ category.name }}({{ category.filmCount }})</option>
        </select>
      </div>
      <div class="col-md-4">
        <select class="form-select" aria-label="Default select example" v-model="country">
          <option selected :value="null">Выберите страну...</option>
          <option v-for="country in countriesStore.countries" :key="country.id" :value="country.id">
            {{ country.name }}({{ country.filmCount }})
          </option>
        </select>
      </div>
      <div class="col-md-3">
        <button class="btn btn-dark me-2" @click.prevent="sortBy = 'name'"
          :class="{ 'active': sortBy === 'name' }">Название</button>
        <button class="btn btn-dark me-2" @click.prevent="sortBy = 'year'"
          :class="{ 'active': sortBy === 'year' }">Год</button>
        <button class="btn btn-dark" @click.prevent="sortBy = 'rating'"
          :class="{ 'active': sortBy === 'rating' }">Рейтинг</button>
      </div>
      <div class="col-md-1">
        <button class="btn btn-secondary" @click="resetParams">Сбросить</button>
      </div>
    </div>



    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div class="col" v-for="film in filmsStore.films" :key="film.id">
        <div class="card h-100" style="bor">
          <img :src="film.link_img" alt="poster" width="100%" height="450px" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">{{ film.name }}</h5>
            <p class="card-text mb-1">Рейтинг: {{ Number(film.ratingAvg).toFixed(1) }}</p>
            <p class="card-text">Продолжительность: {{ film.duration }}</p>
            <p class="card-text">Жанры:
              <template v-for="(category, index) in film.categories" :key="category.id">
                {{ category.name }}{{ (index < film.categories.length - 1) ? ', ' : '' }} </template>
            </p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <div class="mt-1" v-if="authStore.authData">
              <i v-for="index in 1" :key="index" @click.prevent="filmsStore.likeFilm(film.id, index)"
                 class="fa-regular fa-star fa-2xl text-dark"></i>
            </div>
            <div class="mt-1" v-else>
              <i class="fa-regular fas fa-star fa-2xl text-dark"></i>
            </div>
            <div>
              <button class="btn btn-dark" @click="$router.push('/films/' + film.id)">Смотреть</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nav aria-label="Page navigation example" class="mt-4 d-flex justify-content-center">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous" :class="{ 'disabled': filmsStore.page - 1 == 0 }"
            @click.prevent="filmsStore.changePage(filmsStore.page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in Math.ceil(filmsStore.total / filmsStore.size)" :key="page">
          <a class="page-link" :class="{ 'active': page == filmsStore.page }"
            @click.prevent="filmsStore.changePage(page)" href="#">{{ page }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next"
            :class="{ 'disabled': Math.ceil(filmsStore.total / filmsStore.size) == filmsStore.page }"
            @click.prevent="filmsStore.changePage(filmsStore.page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </template>

  <div v-else>
    <div class="row">
      <div class="col-md-12 mt-5 mb-5"></div>
      <div class="d-flex justify-content-center mt-5">
        <div class="spinner-border" style="width: 3px" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.page-link {
  color: white;
  background-color: rgba(0, 0, 0, 0.850);
  border: 1px solid rgba(0, 0, 0, 0.700);
  border-radius: 5px;
  margin: 5px;
}

.page-link:hover {
  color: rgba(0, 0, 0, 0.850);
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.700);
  border-radius: 5px;
  transition: 0.5s;
}

.pagination .page-link:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.700);
  color: rgba(0, 0, 0, 0.850);
  background-color: white;
}

.form-select:focus {
  box-shadow: 0 0 0 0.20rem rgba(0, 0, 0, 0.300);
  border-color: rgba(0, 0, 0, 0.300);
  color: rgba(0, 0, 0, 0.850);
  background-color: white;
}
</style>