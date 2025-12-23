import { useI18n } from "vue-i18n";

export const tasksColumn = () => {
  const { t } = useI18n()

  return [
    {
      title: "№",
      dataIndex: "colIndex",
      key: "colIndex",
      width: 40,
      align: "center",
    },
    {
      title: t("Tasks.studentDescription"),
      dataIndex: "description",
      key: "description",
      width: 150,
      align: "center",
    },
    {
      title: t("Tasks.teacherDescription"),
      dataIndex: "teacherDescription",
      key: "teacherDescription",
      width: 200,
      align: "center",
    },
    {
      title: t("Tasks.homework"),
      dataIndex: "HwLink",
      key: "HwLink",
      width: 100,
      align: "center",
    },
    {
      title: t("Tasks.created"),
      dataIndex: "date",
      key: "date",
      width: 100,
      align: "center",
    },
    {
      title: t("Tasks.status"),
      dataIndex: "status",
      key: "status",
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
