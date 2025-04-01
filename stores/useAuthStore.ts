import { defineStore } from 'pinia'
import { api } from '~/api';

export const useAuthStore = defineStore('auth', ()=> {
  const authData = ref(null);
  const authCookie = useCookie('authData');


  async function signin(email:string, password:string) {
    try {
      const res = await api.post('/auth/signin', {email, password});
      saveAuthData(res.data)
    } catch(error:any) {
      throw new Error(error.response.data.message);
    }
  }

  
  async function signup(dataSignup:any) {
    try {
      const res = await api.post('/auth/signup', dataSignup);
      saveAuthData(res.data)
    } catch(error:any) {
      throw new Error(error.response.data.message);
    }
  }

  async function signout() {
    await api.post('/auth/signout', null, {
    headers: {
      'Authorization' : 'Bearer ' + authData.value.token,
    }
  });
    removeAuthData();
  }

  function saveAuthData(data:any) {
    authData.value = data;
    authCookie.value = btoa(JSON.stringify(data));
  }

  function removeAuthData() {
    authData.value = null;
    authCookie.value = null;
  }

  function readAuthData() {
    if (authCookie.value) {
      authData.value = JSON.parse(atob(authCookie.value));
    }
  }
  readAuthData();

  return {
    authData,
    signin,
    signout,
    signup,
    removeAuthData,
  }
});

