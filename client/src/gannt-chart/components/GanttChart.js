import React from "react";
import { Card, Descriptions, Row, Table, theme } from "antd";
import { tasks } from "../data"; // 프로젝트와 작업 데이터 가져오기

const GanttChart = (props) => {
  const { project } = props;
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  // 시작일부터 종료일까지의 날짜를 월별로 그룹화하여 열 추가
  const addDateColumns = (project) => {
    const columns = [];
    let currentMonth = new Date(project.start_date).getMonth();
    let monthColumns = [];
    let monthLabel = new Date(project.start_date).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    for (
      let d = new Date(project.start_date);
      d <= new Date(project.end_date);
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
        width: 50,
        ellipsis: true,

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

  const columns = (project) => {
    return [
      {
        title: "Task",
        dataIndex: "task_name",
        key: "task_name",
        fixed: "left",
        minWidth: 200,
        ellipsis: true,
        align: "center",
        render: (text) => <strong>{text}</strong>,
      },
      ...addDateColumns(project),
    ];
  };

  return (
    <div className="gantt-container">
      {/* {projects.map((project) => ( */}
      <Card
        key={project.project_id}
        title={<ProjectDescription />}
        style={{ marginBottom: 16, borderRadius: borderRadiusLG }}
      >
        <Table
          className="gantt-table"
          columns={columns(project)}
          dataSource={tasks.filter(
            (task) => task.project_id === project.project_id
          )}
          pagination={false}
          scroll={{ x: "max-content" }}
          sticky
        />
      </Card>
      {/* ))} */}
    </div>
  );
};

const items = [
  {
    label: "Product",
    children: "Cloud Database",
  },
  {
    label: "Billing",
    children: "Prepaid",
  },
  {
    label: "Time",
    children: "18:00:00",
  },
  {
    label: "Amount",
    children: "$80.00",
  },
  {
    label: "Discount",
    span: {
      xl: 2,
      xxl: 2,
    },
    children: "$20.00",
  },
  {
    label: "Official",
    span: {
      xl: 2,
      xxl: 2,
    },
    children: "$60.00",
  },
  {
    label: "Config Info",
    span: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 2,
      xxl: 2,
    },
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
      </>
    ),
  },
  {
    label: "Hardware Info",
    span: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 2,
      xxl: 2,
    },
    children: (
      <>
        CPU: 6 Core 3.5 GHz
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
      </>
    ),
  },
];
const ProjectDescription = () => (
  <div style={{ paddingBlock: "20px" }}>
    <Descriptions
      title="Responsive Descriptions"
      bordered
      column={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      items={items}
    />
  </div>
);

export default GanttChart;
