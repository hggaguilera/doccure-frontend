import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Switch } from "antd";

// Locale
import "dayjs/locale/es";

// Custom Components
import Layout from "../../../components/layout/admin";

// Helpers
import { calculateAge, formattedFullAddress, formattedPhoneNumber } from "@/libs/helpers";

import { useGetPatientsQuery, useUpdatePatientMutation } from "@/store/services/patient";

function Patients() {
  const { data } = useGetPatientsQuery();
  const [updatePatient, { isLoading }] = useUpdatePatientMutation();
  const navigate = useNavigate();

  const handleStatusUpdate = async (id, checked) => {
    await updatePatient({ id, body: { status: checked ? "active" : "inactive" } }).unwrap();
  };

  const columns = [
    {
      title: "Nombre del Paciente",
      dataIndex: "name",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Edad",
      dataIndex: "dateOfBirth",
      render: (text) => calculateAge(text),
    },
    {
      title: "Direccion",
      dataIndex: "addresses",
      ellipsis: true,
      render: (_, record) => {
        return formattedFullAddress(record.addresses);
      },
    },
    {
      title: "Numero de Telefono",
      dataIndex: "phoneNumbers",
      render: (_, record) => {
        const formattedNumber = formattedPhoneNumber(record.phoneNumbers);

        return <a href={`tel:${formattedNumber.fullNumber}`}>{formattedNumber.phoneNumber}</a>;
      },
    },
    {
      title: "Correo Electronico",
      dataIndex: "email",
    },

    {
      title: "Estado",
      dataIndex: "status",
      render: (text, record) => (
        <Switch
          className="custom-switch"
          checked={text === "active"}
          onChange={(checked) => handleStatusUpdate(record.id, checked)}
        />
      ),
    },
    {
      title: "Acciones",
      render: (_, record) => (
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => navigate(`/admin/patients/edit/${record.id}`)}
          disabled={isLoading}
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
      Agregar Paciente
    </Link>
  );

  return (
    <Layout
      pageTitle="Pacientes"
      mainPage="Dashboard"
      mainPageUrl="/admin"
      currentPage="Pacientes"
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
                    showTotal: (total) => `${total} Pacientes en Total`,
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

export default Patients;
