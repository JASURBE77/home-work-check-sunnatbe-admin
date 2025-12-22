import { defineStore } from "pinia";
import api from "../utils/api";
import { notification } from "ant-design-vue";

const useTask = defineStore("task", {
  state: () => ({
    tasks: [],
    loading: false,
  }),

  actions: {
    getTasks(id) {
      this.loading = true;

      api({
        url: `submissions/${id}`,
        method: "GET",
      })
        .then(({ data }) => {
          this.tasks = data.recentSubmissions;
        })
        .catch((error) => {
          notification.error({
            message: error.response?.data?.message,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});

export default useTask;
