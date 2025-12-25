import { useI18n } from "vue-i18n";

export const groupColumns = () => {
  const { t } = useI18n();

  return [
    {
      title: "№",
      dataIndex: "colIndex",
      key: "colIndex",
      width: 40,
      align: "center",
    },
    {
      title: t("GROUP.groupName"),
      dataIndex: "groupName",
      key: "groupName",
      width: 150,
      align: "center",
    },
    {
      title: t("GROUP.groupUsersCount"),
      dataIndex: "groupUsersCount",
      key: "groupUsersCount",
      width: 100,
      align: "center",
    },
    {
      title: t("GROUP.groupLessons"),
      dataIndex: "groupLessons",
      key: "groupLessons",
      width: 100,
      align: "center",
    },
    {
      title: t("GROUP.description"),
      dataIndex: "description",
      key: "description",
      width: 100,
      align: "center",
    },
    {
      title: t("ACTIONS"),
      dataIndex: "actions",
      key: "actions",
      width: 60,
      align: "center",
    },
  ];
};

export const groupStudentColumns = () => {
  const { t } = useI18n();

  return [
    {
      title: "№",
      dataIndex: "colIndex",
      key: "colIndex",
      width: 40,
      align: "center",
    },
    {
      title: t("Students.FISH"),
      dataIndex: "name",
      key: "name",
      width: 150,
      align: "center",
    },
    {
      title: t("Students.totalHomeworks"),
      dataIndex: "totalHomeworks",
      key: "totalHomeworks",
      width: 100,
      align: "center",
    },
    {
      title: t("Students.completedHomeworks"),
      dataIndex: "completedHomeworks",
      key: "completedHomeworks",
      width: 100,
      align: "center",
    },
    {
      title: t("Students.pendingHomeworks"),
      dataIndex: "pendingHomeworks",
      key: "pendingHomeworks",
      width: 100,
      align: "center",
    },
    {
      title: t("Students.wpm"),
      dataIndex: "wpm",
      key: "wpm",
      width: 100,
      align: "center",
    },
    {
      title: t("ACTIONS"),
      dataIndex: "actions",
      key: "actions",
      width: 60,
      align: "center",
    },
  ];
};
