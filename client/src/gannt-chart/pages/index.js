// App.js
import React from "react";
import { Layout } from "antd";
import GanntChart from "../components/GanttChart";
import "../styles/GanntChart.css";

const { Header, Content } = Layout;

const GanntChartPage = () => {
  return (
    <Layout>
      <Header style={{ color: "white", textAlign: "center" }}>
        <h1>Project Management Gantt Chart</h1>
      </Header>
      <Content style={{ padding: "20px" }}>
        <GanntChart />
      </Content>
    </Layout>
  );
};

export default GanntChartPage;
