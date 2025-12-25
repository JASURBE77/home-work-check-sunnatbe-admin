import { defineStore } from "pinia";
import api from "../utils/api";
import { notification } from "ant-design-vue";

const useGroup = defineStore("group", {
  state: () => ({
    groups: [],
    groupStudents: [],
    loadingGroups: false,
    loadingStudents: false,
    buttonLoading: false,
    totalGroups: 0,
    totalStudents: 0,
    pageSizeGroups: 10,
    pageSizeStudents: 10,
    currentPageGroups: 1,
    currentPageStudents: 1,
    groupParams: { page: 0, size: 10, search: "" },
    studentParams: { page: 0, size: 10, search: "" },
  }),

  actions: {
    getGroups({ page = 0, size = 10, search = "" } = {}) {
      this.loadingGroups = true;
      this.groupParams = { page, size, search };

      api({
        url: "groups",
        method: "GET",
        params: { page, size, search },
      })
        .then(({ data }) => {
          this.groups = data.data;
          this.totalGroups = data.totalGroups;
          this.pageSizeGroups = data.size;
          this.currentPageGroups = page + 1;
        })
        .catch(() => {
          notification.error({ message: "Guruhlar olinmadi" });
        })
        .finally(() => {
          this.loadingGroups = false;
        });
    },

    getGroupStudents(groupId, { page = 0, size = 10, search = "" } = {}) {
      if (!groupId) return;
      this.loadingStudents = true;
      this.studentParams = { page, size, search };
      api({
        url: `groups/${groupId}/users`,
        method: "GET",
        params: { page, size, search },
      })
        .then(({ data }) => {
          this.groupStudents = data.students;
          this.totalStudents = data.totalStudents;
          this.pageSizeStudents = data.size;
          this.currentPageStudents = page + 1;
        })
        .catch(() => {
          notification.error({ message: "Studentlar olinmadi" });
        })
        .finally(() => {
          this.loadingStudents = false;
        });
    },

    createGroup(payload, callback) {
      this.buttonLoading = true;

      api({
        url: "groups",
        method: "POST",
        data: payload,
      })
        .then(({ data }) => {
          notification.success({
            message: "Yangi guruh qo'shildi",
          });
          this.groups.unshift(data.group);

          callback?.();
        })
        .catch((err) => {
          notification.error({
            message: err.response?.data?.message || "Student yaratilmadi",
          });
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },

    deleteGroup(groupId) {
      this.loadingGroups = true;

      api({
        url: `groups/${groupId}`,
        method: "DELETE",
      })
        .then(() => {
          this.groups = this.groups.filter((group) => group._id !== groupId);

          this.totalGroups = Math.max(0, this.totalGroups - 1);
          
          notification.success({
            message: "Guruh o'chirildi",
          });
        })
        .catch((err) => {
          notification.error({
            message: err.response?.data?.message,
          });
        })
        .finally(() => {
          this.loadingGroups = false;
        });
    },
  },
});

export default useGroup;
