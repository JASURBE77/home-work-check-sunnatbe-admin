import { defineStore } from "pinia";
import api from "../utils/api";

const useUser = defineStore("user", {
  state: () => ({
    user: {},
    users: [],
    params: {
      size: 10,
      page: 0,
    },
    loading: false,
  }),

  actions: {
    me() {
      this.loading = true;

      api({
        url: "me",
        method: "GET",
      })
        .then(({ data }) => {
          this.user = data;
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

    getUsers() {
      this.loading = true;

      api({
        url: "all",
        method: "GET",
        params: this.params,
      })
        .then(({ data }) => {
          this.users = data;
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

export default useUser;
