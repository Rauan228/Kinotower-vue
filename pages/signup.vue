<script lang="ts" setup>
const authStore = useAuthStore();
const gendersStore = useGendersStore();
const router = useRouter();
const email = ref('');
const fio = ref('');
const birthday = ref('');
const password = ref('');
const gender = ref(1);
const errorMsg = ref('');

const signup = async () => {
  if (fio.value &&
    email.value &&
    password.value &&
    birthday.value &&
    gender.value) {
    try {
      await authStore.signup({
        fio: fio.value,
        email: email.value,
        password: password.value,
        birthday: birthday.value,
        gender_id: gender.value
      });
      router.push('/');
    } catch (error: any) {
      errorMsg.value = error.message;
    }
  }
};
</script>

<template>
  <template v-if="authStore">
    <div class="row mt-5 mb-5">
      <div class="m-auto col-md-5">
        <div class="card p-2 bg-dark">
          <div class="card-title text-center text-light">
            <h4>РЕГИСТРАЦИЯ</h4>
          </div>
          <form @submit.prevent="signup">
            <div class="form-floating mb-3">
              <input type="text" v-model="fio" class="form-control" id="Fio" placeholder="Fio">
              <label for="Fio">ФИО</label>
            </div>
            <div class="form-floating mb-3">
              <input type="email" v-model="email" class="form-control" id="Email" placeholder="Email">
              <label for="Email">Почта</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" v-model="password" class="form-control" id="Password" placeholder="Password">
              <label for="Password">Пароль</label>
            </div>
            <div class="form-floating mb-3">
              <input type="date" v-model="birthday" class="form-control" id="Birthday" placeholder="Birthday">
              <label for="Birthday">День рождения</label>
            </div>
            <div class="form-floating mb-3">
              <select v-model="gender" class="form-select" id="Gender">
                <option :value="null">Выбрать гендер...</option>
                <option v-for="gender in gendersStore.genders" :value="gender.id" :key="gender.id">{{ gender.name }}
                </option>
              </select>
              <label for="Gender">Гендер</label>
            </div>

            <div class="alert alert-danger" role="alert" v-show="errorMsg">
              {{ errorMsg }}
            </div>

            <div class="d-flex justify-content-center">
              <button type="submit" class="btn btn-secondary mb-2 ps-5 pe-5">Зарегистрироваться</button>
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

<style scoped>
.card {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.5s ease;
}

.card:hover {
  box-shadow: 0 0 50px rgba(0, 0, 0, 1);
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