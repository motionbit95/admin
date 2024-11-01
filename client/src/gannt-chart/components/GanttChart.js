import React from "react";
import { Card, Table, theme } from "antd";
import { projects, tasks } from "../data"; // 프로젝트와 작업 데이터 가져오기

const GanttChart = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const getMaxEndDate = () => {
    return Math.max(...projects.map((project) => new Date(project.end_date)));
  };

  const getMinStartDate = () => {
    return Math.min(...projects.map((project) => new Date(project.start_date)));
  };

  const maxEndDate = getMaxEndDate();
  const minStartDate = getMinStartDate();

  // 시작일부터 종료일까지의 날짜를 월별로 그룹화하여 열 추가
  const addDateColumns = () => {
    const columns = [];
    let currentMonth = new Date(minStartDate).getMonth();
    let monthColumns = [];
    let monthLabel = new Date(minStartDate).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    for (
      let d = new Date(minStartDate);
      d <= maxEndDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateString = d.toISOString().split("T")[0];
      const day = d.getDate();
      const month = d.getMonth();

      // 날짜를 월 단위로 그룹화
      if (month !== currentMonth) {
        columns.push({
          title: monthLabel,
          children: monthColumns,
        });
        monthColumns = [];
        currentMonth = month;
        monthLabel = d.toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        });
      }

      monthColumns.push({
        title: day.toString().padStart(2, "0"),
        dataIndex: `date_${dateString}`,
        key: `date_${dateString}`,
        width: 54,
        render: (_, record) => {
          const taskStartDate = new Date(record.start_date);
          const taskEndDate = new Date(record.end_date);
          const currentDate = new Date(dateString);

          const isInTaskRange =
            taskStartDate <= currentDate && currentDate <= taskEndDate;
          return (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: isInTaskRange ? record.color : "transparent",
              }}
            />
          );
        },
      });
    }

    // 마지막 월 추가
    if (monthColumns.length > 0) {
      columns.push({
        title: monthLabel,
        children: monthColumns,
      });
    }

    return columns;
  };

  const columns = [
    {
      title: "Task",
      dataIndex: "task_name",
      key: "task_name",
      fixed: "left",
      width: 200,
    },
    ...addDateColumns(),
  ];

  return (
    <div className="gantt-container">
      {projects.map((project) => (
        <Card
          key={project.project_id}
          title={project.project_name}
          style={{ marginBottom: 16 }}
        >
          <Table
            className="gantt-table"
            columns={columns}
            dataSource={tasks.filter(
              (task) => task.project_id === project.project_id
            )}
            pagination={false}
            scroll={{ x: "max-content" }}
            sticky
          />
        </Card>
      ))}
    </div>
  );
};

export default GanttChart;
