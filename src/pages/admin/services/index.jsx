import React, { useState } from "react";
import { Table, Switch } from "antd";

// Custom Components
import Layout from "../../../components/layout/admin";
import ServiceModal from "../forms/service";

import { useGetServicesQuery, useUpdateServiceMutation } from "@/store/services/service";

function Services() {
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [serviceId, setServiceId] = useState(null);

  const { data } = useGetServicesQuery();
  const [updateService] = useUpdateServiceMutation();

  const handleEditMode = (id) => {
    setServiceId(id);
    setEditMode(true);
    setShow(true);
  };

  const handleNewMode = () => {
    setServiceId(null);
    setEditMode(false);
    setShow(true);
  };

  const handleStatusUpdate = async (id, checked) => {
    await updateService({ id, body: { status: checked ? "active" : "inactive" } }).unwrap();
  };

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
      render: (text, record) => (
        <Switch
          className="custom-switch"
          checked={text === "active"}
          onChange={async (checked) => handleStatusUpdate(record.id, checked)}
        />
      ),
    },
    {
      title: "Acciones",
      render: (_, record) => (
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => handleEditMode(record.id)}
        >
          <i className="fe fe-pencil" /> Editar
        </button>
      ),
    },
  ];

  const renderActionButton = () => (
    <button type="button" className="btn btn-primary float-end mt-2" onClick={handleNewMode}>
      Agregar Servicio
    </button>
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
      <ServiceModal show={show} setShow={setShow} serviceId={serviceId} editMode={editMode} />
    </Layout>
  );
}

export default Services;
