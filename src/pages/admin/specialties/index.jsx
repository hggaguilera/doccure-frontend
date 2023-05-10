import React, { useState } from "react";
import { Table, Switch } from "antd";

// Custom Components
import Layout from "../../../components/layout/admin";
import SpecialtyModal from "../forms/specialty";

import { useGetSpecialtiesQuery, useUpdateSpecialtyMutation } from "@/store/services/specialty";

function Specialties() {
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [specialtyId, setSpecialtyId] = useState(null);

  const { data } = useGetSpecialtiesQuery();
  const [updateSpecialty] = useUpdateSpecialtyMutation();

  const handleEditMode = (id) => {
    setSpecialtyId(id);
    setEditMode(true);
    setShow(true);
  };

  const handleNewMode = () => {
    setSpecialtyId(null);
    setEditMode(false);
    setShow(true);
  };

  const handleStatusUpdate = async (id, checked) => {
    await updateSpecialty({ id, body: { status: checked ? "active" : "inactive" } }).unwrap();
  };

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
      Agregar Especialidad
    </button>
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
      <SpecialtyModal show={show} setShow={setShow} specialtyId={specialtyId} editMode={editMode} />
    </Layout>
  );
}

export default Specialties;
