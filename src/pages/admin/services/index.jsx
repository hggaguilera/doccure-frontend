import React from "react";
import { Table, Switch } from "antd";
import { useNavigate, Link } from "react-router-dom";

// Custom Components
import Layout from "../../../components/layout/admin";

import { useGetServicesQuery } from "@/store/services/service";

function Services() {
  const { data } = useGetServicesQuery();
  const navigate = useNavigate();

  const columns = [
    {
      title: "Servicio",
      dataIndex: "serviceName",
    },
    {
      title: "Descripcion",
      dataIndex: "serviceDescription",
      ellipsis: true,
    },
    {
      title: "Precio (En Dolares)",
      dataIndex: "price",
      render: (text) => `$ ${text}`,
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
          onClick={() => navigate(`/admin/services/edit/${record.id}`)}
        >
          <i className="fe fe-pencil" /> Editar
        </button>
      ),
    },
  ];

  const renderActionButton = () => (
    <Link className="btn btn-primary float-end mt-2" to="new">
      Agregar Servicio
    </Link>
  );

  return (
    <Layout
      pageTitle="Servicios"
      mainPage="Dashboard"
      mainPageUrl="/admin"
      currentPage="Servicios"
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
                  pagination={{
                    total: data?.length,
                    showTotal: (total) => `${total} Servicios en Total`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Services;
