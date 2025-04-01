<script lang="ts" setup>
const authStore = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');
const errorMsg = ref('');

const signin = async () => {
  if (email.value && password.value) {
    try {
      await authStore.signin(email.value, password.value);
      router.push('/');
    } catch (error: any) {
      errorMsg.value = error.message;
    }
  }
};
</script>

<template>
  <template v-if="authStore">
    <div class="row mt-5">
      <div class="m-auto col-md-5">
        <div class="card p-2 bg-dark">
          <div class="card-title text-center text-light">
            <h4>АВТОРИЗАЦИЯ</h4>
          </div>
          <form @submit.prevent="signin">
            <div class="form-floating mb-3">
              <input type="email" v-model="email" class="form-control" id="Email" placeholder="Email">
              <label for="Email">Почта</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" v-model="password" class="form-control" id="Password" placeholder="Password">
              <label for="Password">Пароль</label>
            </div>

            <div class="alert alert-danger" role="alert" v-show="errorMsg">
              {{ errorMsg }}
            </div>

            <div class="d-flex justify-content-center">
              <button type="submit" class="btn btn-secondary mb-2 ps-5 pe-5">Войти</button>
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
</style>