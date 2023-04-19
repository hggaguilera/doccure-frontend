import React from "react";
import { Table, Switch } from "antd";
// import { Link } from "react-router-dom";
// import dayjs from "dayjs";

// Locale
import "dayjs/locale/es";

// Custom Components
import Layout from "../../../components/layout/admin";

// Helpers
import { calculateAge, formattedFullAddress, formattedPhoneNumber } from "@/libs/helpers";

import { useGetPatientsQuery } from "@/store/services/patient";

function Patients() {
  const { data } = useGetPatientsQuery();

  const columns = [
    {
      title: "Nombre de el Paciente",
      dataIndex: "name",
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
        if (!record.addresses.length) {
          return "";
        }

        return formattedFullAddress(record.addresses[0]);
      },
    },
    {
      title: "Numero de Telefono",
      dataIndex: "phoneNumbers",
      render: (_, record) => {
        const formattedNumber = formattedPhoneNumber(record.phoneNumbers[0]);

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
  ];

  return (
    <Layout pageTitle="Pacientes" mainPage="Tablero" mainPageUrl="/admin" currentPage="Pacientes">
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
