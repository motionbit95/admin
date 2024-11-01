// App.js
import React from "react";
import { Layout } from "antd";
import GanntChart from "../components/GanttChart";
import { projects } from "../data";
import "../styles/GanntChart.css";

const { Header, Content } = Layout;

const GanntChartPage = () => {
  return (
    <Content style={{ padding: "20px" }}>
      <GanntChart project={projects[0]} />
    </Content>
  );
};

export default GanntChartPage;
