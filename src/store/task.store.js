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

    checkTask(form, submissionId, callback, t) {
      this.buttonLoading = true;

      api({
        url: `submissions/${useUser().user._id}/${submissionId}`,
        method: "put",
        data: {
          form,
        },
      })
        .then(({ data }) => {
          const index = this.tasks.findIndex(
            (task) => task._id === submissionId
          );

          if (index !== -1) {
            this.tasks[index] = {
              ...this.tasks[index],
              ...data.submission,
            };
          }
          notification.success({
            message: t("NOTIFICATION.checkedStudent"),
          });

          callback?.();
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
