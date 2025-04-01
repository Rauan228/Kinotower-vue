<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" @click="$router.push('/')" href="#">
        <img src="/public/logo.svg" alt="logo" width="45"> <b class="text-light">inoTower</b>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <template v-if="!authStore.authData">
          <button @click="$router.push('/signin')" class="btn btn-secondary me-2" type="submit">Войти</button>
          <button @click="$router.push('/signup')" class="btn btn-secondary" type="submit">Зарегистрироваться</button>
        </template>
        <template v-else>
          <button @click="$router.push('/user')" class="btn btn-secondary me-2" type="submit">{{ authStore.authData.fio }}</button>
          <button @click="authStore.signout(), $router.push('/')" class="btn btn-secondary me-2" type="submit">Выйти</button>
        </template>
      </div>
    </div>
  </nav>
  <div class="container py-2 mb-auto" style="min-height: calc(100vh-190px) !important ">
    <slot />
  </div>

  <footer class="d-flex flex-wrap justify-content-center align-items-center py-3 border-top bg-dark text-light">
    <div class="col-md-auto">
      <span class="mb-3" color="white">COPYRIGHT</span>
    </div>
  </footer>

</template>


<style>
.container {
  min-height: calc(100vh - 132px);
}
</style>
