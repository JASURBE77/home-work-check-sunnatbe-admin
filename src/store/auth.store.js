import { defineStore } from "pinia";
import api from "../utils/api";
import { notification } from "ant-design-vue";

const useAuth = defineStore("auth", {
  state: () => ({
    formModel: {
      login: "",
      password: "",
    },
    loading: false,
  }),

  actions: {
    login() {
      this.loading = true;

      return api({
        url: "login",
        method: "POST",
        data: this.formModel,
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.accessToken);
          localStorage.setItem("refresh_token", data.refreshToken);
        })
        .catch((error) => {
          notification.error({
            message: error.response?.data?.message || error,
          });
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});

export default useAuth;
