import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Switch } from "antd";

// Locale
import "dayjs/locale/es";

// Custom Components
import Layout from "../../../components/layout/admin";

// Helpers
import { calculateAge, formattedFullAddress, formattedPhoneNumber } from "@/libs/helpers";

import { useGetPatientsQuery } from "@/store/services/patient";

function Patients() {
  const { data } = useGetPatientsQuery();
  const navigate = useNavigate();

  const columns = [
    {
      title: "Nombre de el Paciente",
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
      render: (text) => <Switch className="custom-switch" checked={text === "active"} />,
    },
    {
      title: "Acciones",
      render: (_, record) => (
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => navigate(`/admin/patients/edit/${record.id}`)}
        >
          Editar
        </button>
      ),
    },
  ];

  const renderActionButton = () => (
    <Link className="btn btn-primary float-end mt-2" to="new">
      Agregar Paciente
    </Link>
  );

  return (
    <Layout
      pageTitle="Pacientes"
      mainPage="Tablero"
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

export default Patients;
