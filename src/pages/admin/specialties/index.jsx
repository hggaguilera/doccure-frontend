import React from "react";
import { Table, Switch } from "antd";
import { useNavigate, Link } from "react-router-dom";

// Custom Components
import Layout from "../../../components/layout/admin";

import { useGetSpecialtiesQuery } from "@/store/services/specialty";

function Specialties() {
  const { data } = useGetSpecialtiesQuery();
  const navigate = useNavigate();

  const columns = [
    {
      title: "Especialidad",
      dataIndex: "specialtyName",
    },
    {
      title: "Descripcion",
      dataIndex: "specialtyDescription",
      ellipsis: true,
    },
    {
      title: "Estado",
      dataIndex: "status",
      render: (text) => <Switch className="custom-switch" checked={text === "active"} />,
    },
    {
      title: "Acciones",
      render: (_, record) => (
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => navigate(`/admin/specialties/edit/${record.id}`)}
        >
          <i className="fe fe-pencil" /> Editar
        </button>
      ),
    },
  ];

  const renderActionButton = () => (
    <Link className="btn btn-primary float-end mt-2" to="new">
      Agregar Especialidad
    </Link>
  );

  return (
    <Layout
      pageTitle="Especialidades"
      mainPage="Dashboard"
      mainPageUrl="/admin"
      currentPage="Especialidades"
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

export default Specialties;
