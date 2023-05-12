import React from "react";
import { Table, Switch } from "antd";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// Locale
import "dayjs/locale/es";

// Custom Components
import Layout from "../../../components/layout/admin";
import profiles from "../../../libs/doctors";

import { useGetDoctorsQuery, useUpdateDoctorMutation } from "../../../store/services/doctor";
import { useGetSpecialtiesQuery } from "@/store/services";

function Doctors() {
  const { data } = useGetDoctorsQuery();
  const { data: specialties, isLoading } = useGetSpecialtiesQuery();
  const [updateDoctor, { isLoading: isSaving }] = useUpdateDoctorMutation();
  const navigate = useNavigate();

  const handleStatusUpdate = async (id, checked) => {
    await updateDoctor({ id, body: { status: checked ? "active" : "inactive" } }).unwrap();
  };

  const handleAdminStatusUpdate = async (id, checked) => {
    await updateDoctor({ id, body: { isSystemUser: checked } }).unwrap();
  };

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
      render: (_, record) => {
        const latestSpecialtyId = record?.specializations[record.specializations.length - 1];
        const specialty = isLoading
          ? ""
          : specialties.find((item) => item.id === latestSpecialtyId);
        return <span>{specialty.specialtyName}</span>;
      },
    },
    {
      title: "Miembro Desde",
      dataIndex: "createdAt",
      render: (text) => dayjs(text).locale("es").format("D [de] MMMM [de] YYYY"),
    },
    {
      title: "Administrador",
      dataIndex: "isSystemUser",
      render: (text, record) => (
        <Switch
          className="custom-switch"
          checked={text}
          onChange={(checked) => handleAdminStatusUpdate(record.personId, checked)}
        />
      ),
    },
    {
      title: "Estado",
      dataIndex: "status",
      render: (text, record) => (
        <Switch
          className="custom-switch"
          checked={text === "active"}
          onChange={(checked) => handleStatusUpdate(record.personId, checked)}
        />
      ),
    },
    {
      title: "Acciones",
      render: (_, record) => (
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => navigate(`/admin/doctors/edit/${record.id}`)}
          disabled={isSaving}
        >
          <i className="fe fe-pencil" /> Editar
        </button>
      ),
    },
  ];

  const renderActionButton = () => (
    <Link
      className="btn btn-primary float-end mt-2"
      to="new"
      style={{ pointerEvents: isLoading ? "none" : "cursor" }}
    >
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
