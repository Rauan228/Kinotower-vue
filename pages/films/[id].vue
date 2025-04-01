<script lang="ts" setup>
const detailFilmStore = useDetailFilmStore();
const route = useRoute();
const authStore = useAuthStore();
const message = ref('');

detailFilmStore.fetchFilm(route.params.id);
detailFilmStore.fetchReviews(route.params.id);
const sendReview = () => {
  if (message.value) {
    detailFilmStore.addReview(route.params.id, message.value);
  }
}
</script>

<template>
  <template v-if="detailFilmStore.film">
    <div class="row">
      <div class="col-md-12 d-flex mb-3">
        <div class="col-md-2">
          <h1>{{ Number(detailFilmStore.film.ratingAvg).toFixed(1) }}</h1>
        </div>
        <div class="col-md-8">
          <div class="ratio ratio-16x9">
            <iframe :src="detailFilmStore.film.link_video" title="YouTube video" allowfullscreen></iframe>
          </div>
        </div>
        <div class="col-md-2" v-if="authStore.authData">
          <div class="d-flex flex-column ms-2 mt-2">
            <p><a @click.prevent="detailFilmStore.addRating(10)" href=""
                class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                  class="fa-regular fas fa-star fa-2xl"></i></a></p>
            <p><a @click.prevent="detailFilmStore.addRating(9)" href=""
                class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                  class="fa-regular fas fa-star fa-2xl"></i></a></p>
            <p><a @click.prevent="detailFilmStore.addRating(8)" href=""
                class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                  class="fa-regular fas fa-star fa-2xl"></i></a></p>
            <p><a @click.prevent="detailFilmStore.addRating(7)" href=""
                class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                  class="fa-regular fas fa-star fa-2xl"></i></a></p>
            <p><a @click.prevent="detailFilmStore.addRating(6)" href=""
                class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                  class="fa-regular fas fa-star fa-2xl"></i></a></p>
            <p><a @click.prevent="detailFilmStore.addRating(5)" href=""
                class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                  class="fa-regular fas fa-star fa-2xl"></i></a></p>
            <p><a @click.prevent="detailFilmStore.addRating(4)" href=""
                class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                  class="fa-regular fas fa-star fa-2xl"></i></a></p>
            <p><a @click.prevent="detailFilmStore.addRating(3)" href=""
                class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                  class="fa-regular fas fa-star fa-2xl"></i></a></p>
            <p><a @click.prevent="detailFilmStore.addRating(2)" href=""
                class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                  class="fa-regular fas fa-star fa-2xl"></i></a></p>
            <p><a @click.prevent="detailFilmStore.addRating(1)" href=""
                class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                  class="fa-regular fas fa-star fa-2xl"></i></a></p>

          </div>
        </div>
        <div class="col-md-2" v-else>
          <div class="d-flex flex-column ms-2 mt-2">
            <p class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                class="fa-regular fa-star fa-2xl"></i></p>
            <p class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                class="fa-regular fa-star fa-2xl"></i></p>
            <p class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                class="fa-regular fa-star fa-2xl"></i></p>
            <p class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                class="fa-regular fa-star fa-2xl"></i></p>
            <p class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                class="fa-regular fa-star fa-2xl"></i></p>
            <p class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                class="fa-regular fa-star fa-2xl"></i></p>
            <p class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                class="fa-regular fa-star fa-2xl"></i></p>
            <p class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                class="fa-regular fa-star fa-2xl"></i></p>
            <p class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                class="fa-regular fa-star fa-2xl"></i></p>
            <p class="text-warning link-offset-2 link-underline link-underline-opacity-0"><i
                class="fa-regular fa-star fa-2xl"></i></p>
          </div>
          <div class="col ms-4 mt-2">
            <h6>Чтобы ставить оценки зарегистрируйтесь или войдите в аккаунт</h6>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <h3><b>{{ detailFilmStore.film.name }}</b></h3>
      </div>
      <div class="col-md-12 d-flex">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <h5><b>Продолжительность:</b> {{ detailFilmStore.film.duration }} мин.</h5>
          </li>
          <li class="list-group-item">
            <h5><b>Страна:</b> {{ detailFilmStore.film.country.name }}</h5>
          </li>
          <li class="list-group-item">
            <h5><b>Год выпуска:</b> {{ detailFilmStore.film.year_of_issue }}</h5>
          </li>
          <li class="list-group-item">
            <h5><b>Возрастное ограничение:</b> {{ detailFilmStore.film.age }}</h5>
          </li>
          <li class="list-group-item">
            <h5><b>Дата добавления фильма:</b> {{ new Date(detailFilmStore.film.created_at).toLocaleDateString() }}</h5>
          </li>
          <li class="list-group-item" v-if="detailFilmStore.film.categories.length != 0">
            <h5><b>Жанры: </b>
              <template v-for="(genre, index) in detailFilmStore.film.categories" :key="genre.id">{{ (index !=
    detailFilmStore.film.categories.length - 1) ? genre.name + ', ' : genre.name }}
              </template>
            </h5>
          </li>
          <li class="list-group-item" v-else>
            <h5>Жанров к этому фильму нет</h5>
          </li>
          <li class="list-group-item" v-if="detailFilmStore.film.actors.length != 0">
            <h5><b>Актеры: </b>
              <template v-for="(actor, index) in detailFilmStore.film.actors" :key="actor.id">{{ (index !=
    detailFilmStore.film.actors.length - 1) ? actor.fio + ', ' : actor.fio }}
              </template>
            </h5>
          </li>
          <li class="list-group-item" v-else>
            <h5>Актеров к этому фильму нет</h5>
          </li>
          <li class="list-group-item"><a href="{{ detailFilmStore.film.link_kinopoisk }}" class="link_kinopoisk">
              <h5>Ссылка на кинопоиск</h5>
            </a></li>
        </ul>
      </div>
      <div class="col-md-12 d-flex flex-wrap mt-5" v-if="authStore.authData">
        <div class="col-md-12">
          <h4><label for="review" class="form-label">Добавить отзыв</label></h4>
        </div>
        <div class="col-md-11">
          <textarea v-model="message" class="form-control" id="review" rows="4" placeholder="Отзыв..."></textarea>
        </div>
        <div class="col-md-1 text-end align-content-end">
          <button class="btn btn-dark" @click="sendReview">Отправить</button>
        </div>
      </div>
      <div class="col-md-12 d-flex justify-content-center flex-wrap mt-5 mb-3 text-center" v-else>
        <h5>Чтобы оставить отзыв зарегистрируйтесь или войдите в аккаунт</h5>
      </div>
      <div class="col-md-12 d-flex flex-wrap mt-2">
        <div class="col-md-12">
          <h4>Отзывы</h4>
        </div>
        <div class="card text-bg-dark p-1 mb-1 col-md-12" v-for="review in detailFilmStore.reviews" :key="review.id">
          <div class="card-header d-flex justify-content-between">
            <div>{{ review.user.fio }}</div>
            <div>{{ (new Date(review.created_at)).toLocaleDateString() }}</div>
          </div>
          <div class="card-body">
            <p class="card-title mb-3">{{ review.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  <div v-else>
    <div class="row">
      <div class="col-md-12 mt-5 mb-5"></div>
      <div class="d-flex justify-content-center mt-5">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-control {
  box-shadow: 0 0 0 0.05rem gray;
  border-color: gray;
}

.form-control:focus {
  box-shadow: 0 0 0 0.20rem gray;
  border-color: gray;
}

iframe {
  transition: box-shadow 0.5s ease-out;
  border: 0px solid black;
  border-radius: 10px;
}

iframe:hover {
  box-shadow: 0 0 50px rgba(0, 0, 0, 1);
}

iframe:focus {
  box-shadow: 0 0 50px rgba(0, 0, 0, 1);
}

.link_kinopoisk {
  color: rgba(0, 0, 0, 1);
  transition: color 0.5s ease-out;
}

.link_kinopoisk:after {
  color: rgba(0, 0, 0, 1);
}

.link_kinopoisk:hover {
  color: gray;
  transition: 1s;
}
</style>