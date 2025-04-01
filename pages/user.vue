<script setup lang="ts">
const profileStore = useProfileStore();
const genderStore = useGendersStore();
const authStore = useAuthStore();
const fio = ref('');
const email = ref('');
const birthday = ref('');
const gender = ref(0);


const profileLoad = async () => {

  await profileStore.fetchUserData(authStore.authData.id);
  fio.value = profileStore.userData.fio;
  email.value = profileStore.userData.email;
  birthday.value = profileStore.userData.birthday;
  gender.value = profileStore.userData.gender.id;
};

profileLoad();

const editProfile = async () => {
  if (fio.value && email.value && birthday.value && gender.value) {
    await profileStore.updateProfile(fio.value, email.value, birthday.value, gender.value);
    profileLoad();
  }
};

</script>

<template>
  <template v-if="profileStore.userData">

    <div class="row">
      <div class="col-md-12">
        <h4>{{ profileStore.userData.fio }}</h4>
        <h4>Количество оценок: {{ profileStore.userData.ratingCount }}</h4>
        <h4>Количество отзывов: {{ profileStore.userData.reviewCount }}</h4>
        <h4>Количество избранных фильмов: {{ profileStore.userData.favoriteCount }}</h4>
      </div>
      <div class="col-md-12 mb-3">
        <div id="myTab" role="tablist">
          <button class="user_btn profile col-md-3" id="profile-tab" data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane" role="tab" aria-selected="false">Профиль</button>
          <button class="user_btn profile col-md-3" id="review-tab" data-bs-toggle="tab"
            data-bs-target="#review-tab-pane" role="tab" aria-selected="false">Отзывы</button>
          <button class="user_btn profile col-md-3" id="rating-tab" data-bs-toggle="tab"
            data-bs-target="#rating-tab-pane" role="tab" aria-selected="false">Оценки</button>
          <button class="user_btn profile col-md-3" id="favorite-tab" data-bs-toggle="tab"
            data-bs-target="#favorite-tab-pane" role="tab" aria-selected="false">Избранное</button>
        </div>
      </div>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade active" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab"
          tabindex="0">
          <div class="col-md-12">
            <h5>E-mail: {{ profileStore.userData.email }}</h5>
            <h5>Дата рождения: {{ (new Date(profileStore.userData.birthday)).toLocaleDateString() }}</h5>
            <h5>Пол: {{ profileStore.userData.gender.name }}</h5>
            <button class="btn btn-dark me-2" data-bs-toggle="modal" data-bs-target="#exampleModal"
              data-bs-whatever="@mdo">Изменить</button>
            <button class="btn btn-dark" @click="profileStore.removeUserData(), $router.push('/')">Удалить
              аккаунт</button>
          </div>
        </div>
        <div class="tab-pane fade active" id="review-tab-pane" role="tabpanel" aria-labelledby="review-tab"
          tabindex="0">
          <div class="col-md-12">
            <ul class="list-group mb-2">
              <li class="list-group-item" v-for="review in profileStore.reviewsData" :key="review.id">
                <div class="d-flex flex-wrap mb-2">
                  <div class="col-md-8"><b>{{ review.film.name }}</b></div>
                  <div class="col-md-3 text-end"
                    :class="{ 'text-sucess': review.is_approved, 'text-danger': !review.is_approved }">
                    {{ (review.is_approved) ? 'Одобрено' : 'Не одобрено' }}</div>
                  <div class="col-md-1 text-end">{{ (new Date(review.created_at)).toLocaleDateString() }}</div>
                </div>
                <div class="d-flex flex-wrap">
                  <div class="col-md-10">
                    {{ review.message }}
                  </div>
                  <div class="col-md-2 text-end align-content-end">
                    <button class="btn btn-dark" @click="profileStore.removeReviewsData(review.id)">Удалить</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="tab-pane fade active" id="rating-tab-pane" role="tabpanel" aria-labelledby="rating-tab"
          tabindex="0">
          <div class="col-md-12 d-flex flex-wrap">
            <div class="card text-bg-dark p-1 m-1 col" v-for="rating in profileStore.ratingsData" :key="rating.id">
              <div class="card-header d-flex justify-content-between">
                <div>{{ rating.film.name }}</div>
                <div>{{ (new Date(rating.created_at)).toLocaleDateString() }}</div>
              </div>
              <div class="card-body">
                <h5 class="card-title mb-3">{{ rating.score }}</h5>
                <button class="btn btn-light" @click="profileStore.removeRatingsData(rating.id)">Удалить</button>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade active" id="favorite-tab-pane" role="tabpanel" aria-labelledby="favorite-tab"
          tabindex="0">
          <div class="col-md-12 d-flex flex-wrap">
            <div class="card text-bg-dark p-1 m-1 col-md-12" v-for="favorite in profileStore.favoritesData" :key="favorite.id">
              <div class="card-body d-flex justify-content-between">
                <div><h5>{{ favorite.film.name }}</h5></div>
                <div><button class="btn btn-light" @click="profileStore.removeFavoritesData(favorite.id)">Удалить</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Изменить профиль</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form>
            <div class="modal-body">
              <div class="form-floating mb-3">
                <input type="text" v-model="fio" class="form-control" id="Fio" placeholder="Fio">
                <label for="Fio">ФИО</label>
              </div>
              <div class="form-floating mb-3">
                <input type="email" v-model="email" class="form-control" id="Email" placeholder="Email">
                <label for="Email">Почта</label>
              </div>
              <div class="form-floating mb-3">
                <input type="date" v-model="birthday" class="form-control" id="Birthday" placeholder="Birthday">
                <label for="Birthday">День рождения</label>
              </div>
              <div class="form-floating mb-3">
                <select v-model="gender" class="form-select" id="Gender">
                  <option v-for="gender in genderStore.genders" :key="gender.id" :value="gender.id"
                    :selected="gender.id == gender">{{ gender.name }}
                  </option>
                </select>
                <label for="Gender">Гендер</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
              <button type="button" class="btn btn-dark" @click="editProfile" data-bs-dismiss="modal">Сохранить
                изменения</button>
            </div>
          </form>
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

<script lang="ts" setup>

</script>

<style scoped>
.user_btn {
  border: 0;
  color: rgba(0, 0, 0, 0.700);

  background-image: linear-gradient(to right, black, black);
  background-repeat: no-repeat;
  background-size: 0px 2px;
  background-position: center bottom;
  text-decoration: none;
  transition: 0.3s;
}

.user_btn:hover {
  background-size: 100% 2px;
}

.user_btn:focus {
  background-size: 100% 2px;
  color: rgba(0, 0, 0, 0.900);
}

.form-control:focus {
  box-shadow: 0 0 0 0.20rem gray;
  border-color: gray;
}

.form-select:focus {
  box-shadow: 0 0 0 0.20rem gray;
  border-color: gray;
}
</style>