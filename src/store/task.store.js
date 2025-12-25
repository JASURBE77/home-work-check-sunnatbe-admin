import { defineStore } from "pinia";
import api from "../utils/api";
import { notification } from "ant-design-vue";
import useUser from "./user.store";

const useTask = defineStore("task", {
  state: () => ({
    tasks: [],
    loading: false,
    buttonLoading: false,
    totalTasks: 0,
    pageSize: 0,
    currentPage: 1,
    params: {
      size: 10,
      page: 0,
      status: null,
    },
  }),

  actions: {
    getTasks(id, { page = 0, size = 10, status } = {}) {
      this.loading = true;

      api({
        url: `submissions/${id}`,
        method: "GET",
        params: {
          size,
          page,
          status,
        },
      })
        .then(({ data }) => {
          this.tasks = data.data;
          this.totalTasks = data.totalTasks;
          this.pageSize = data.size;
          this.currentPage = page + 1;
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
          score: form.score,
          teacherDescription: form.teacherDescription,
        },
      })
        .then(({ data }) => {
          const index = this.tasks.findIndex(
            (task) => task.submission._id === submissionId
          );

          if (index !== -1) {
            this.tasks[index].submission = {
              ...this.tasks[index].submission,
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
