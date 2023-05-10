import React from "react";
import { Table, Switch } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// Locale
import "dayjs/locale/es";

// Custom Components
import Layout from "../../../components/layout/admin";
import profiles from "../../../libs/doctors";

import { useGetDoctorsQuery } from "../../../store/services/doctor";

function Doctors() {
  const { data } = useGetDoctorsQuery();

  const columns = [
    {
      title: "Nombre del Doctor",
      dataIndex: "doctor",
      render: (text, record) => (
        <h2 className="table-avatar mb-0">
          <Link to="/admin/profile" className="avatar avatar-sm me-2">
            <img alt={`foto de ${text}`} src={profiles[record.email]?.thumb} />
          </Link>
          <Link to="/admin/profile">{`${record.firstName} ${record.lastName}`}</Link>
        </h2>
      ),
    },
    {
      title: "Correo Electronico",
      dataIndex: "email",
    },
    {
      title: "Especialidad",
      dataIndex: "specializations",
      render: (_, record) => record.specializations[record.specializations.length - 1],
    },
    {
      title: "Miembro Desde",
      dataIndex: "createdAt",
      render: (text) => dayjs(text).locale("es").format("D [de] MMM [de] YYYY"),
    },
    {
      title: "Administrador",
      dataIndex: "isSystemUser",
      render: (text) => <Switch className="custom-switch" checked={text} />,
    },
    {
      title: "Estado",
      dataIndex: "status",
      render: (text) => <Switch className="custom-switch" checked={text === "active"} />,
    },
  ];

  const renderActionButton = () => (
    <Link className="btn btn-primary float-end mt-2" to="new">
      Agregar Doctor
    </Link>
  );

  return (
    <Layout
      pageTitle="Doctores"
      mainPage="Dashboard"
      mainPageUrl="/admin"
      currentPage="Doctores"
      actionButton={renderActionButton()}
    >
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
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Doctors;
