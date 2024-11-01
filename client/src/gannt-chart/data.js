// data.js
export const projects = [
  {
    project_id: 1,
    project_name: "Project A",
    start_date: "2024-11-01",
    end_date: "2024-11-10",
  },
  {
    project_id: 2,
    project_name: "Project B",
    start_date: "2024-11-05",
    end_date: "2024-11-15",
  },
];

export const tasks = [
  {
    task_id: 1,
    project_id: 1,
    task_name: "Task 1",
    assigned_to: "User A",
    start_date: "2024-11-01",
    end_date: "2024-11-03",
    status: "Completed", // 상태 추가
    color: "#4CAF50", // 완료된 작업의 색상
  },
  {
    task_id: 2,
    project_id: 1,
    task_name: "Task 2",
    assigned_to: "User B",
    start_date: "2024-11-02",
    end_date: "2024-11-06",
    status: "In Progress", // 상태 추가
    color: "#2196F3", // 진행 중인 작업의 색상
  },
  {
    task_id: 3,
    project_id: 1,
    task_name: "Task 3",
    assigned_to: "User C",
    start_date: "2024-11-04",
    end_date: "2024-11-09",
    status: "Not Started", // 상태 추가
    color: "#FFC107", // 시작하지 않은 작업의 색상
  },
  {
    task_id: 4,
    project_id: 2,
    task_name: "Task 1",
    assigned_to: "User D",
    start_date: "2024-11-05",
    end_date: "2024-11-08",
    status: "In Progress", // 상태 추가
    color: "#FF5722", // 진행 중인 작업의 색상
  },
  {
    task_id: 5,
    project_id: 2,
    task_name: "Task 2",
    assigned_to: "User E",
    start_date: "2024-11-06",
    end_date: "2024-11-10",
    status: "Completed", // 상태 추가
    color: "#4CAF50", // 완료된 작업의 색상
  },
  {
    task_id: 6,
    project_id: 2,
    task_name: "Task 3",
    assigned_to: "User F",
    start_date: "2024-11-11",
    end_date: "2024-11-12",
    status: "Not Started", // 상태 추가
    color: "#FFC107", // 시작하지 않은 작업의 색상
  },
];
