import { defineStore } from "pinia";
import api from "../utils/api";
import { notification } from "ant-design-vue";
import useUser from "./user.store";

const useTask = defineStore("task", {
  state: () => ({
    tasks: [],
    loading: false,
    buttonLoading: false,
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

    checkTask(form, submissionId) {
      this.buttonLoading = true;

      api({
        url: `submissions/${useUser().user._id}/${submissionId}`,
        method: "put",
        data: {
          form,
        },
      })
        .then(() => {
          notification.success({
            message: "O'quvchi tekshirildi",
          });
        })
        .catch((error) => {
          notification.error({
            message: error.response?.data?.message,
          });
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },
  },
});

export default useTask;
