import React from "react";
import { Table, Switch } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Layout from "../../../components/layout/admin";
import profiles from "../../../libs/doctors.json";

import { useGetAppointmentsQuery } from "../../../services/appointment";

import "./index.css";

function Appointments() {
  const { data } = useGetAppointmentsQuery();

  const columns = [
    {
      title: "Nombre del Doctor",
      dataIndex: "doctor",
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link to="/admin/profile" className="avatar avatar-sm me-2">
            <img alt={`foto de ${text}`} src={profiles[record.doctorEmail].profilePic} />
          </Link>
          <Link to="/admin/profile">{text}</Link>
        </h2>
      ),
    },
    {
      title: "Servicio",
      dataIndex: "service",
    },
    {
      title: "Paciente",
      dataIndex: "patient",
    },
    {
      title: "Fecha",
      dataIndex: "date",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Estado",
      dataIndex: "status",
      render: (text) => <Switch className="custom-switch" checked={text === "active"} />,
    },
  ];

  return (
    <Layout pageTitle="Citas" mainPage="Tablero" mainPageUrl="/admin" currentPage="Citas">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <Table
                  className="table-striped"
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  dataSource={data}
                  rowKey={(record) => record.id}
                  pagination={{ total: data?.length, showSizeChanger: true }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Appointments;
