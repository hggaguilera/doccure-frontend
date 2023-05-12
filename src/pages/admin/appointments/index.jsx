import React from "react";
import { Table, Switch } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Layout from "../../../components/layout/admin";
import profiles from "../../../libs/doctors";

// Locale
import "dayjs/locale/es";

import { useGetAppointmentsQuery } from "../../../store/services/appointment";

function Appointments() {
  const { data } = useGetAppointmentsQuery();

  const columns = [
    {
      title: "Nombre del Doctor",
      dataIndex: "doctor",
      render: (text, record) => (
        <h2 className="table-avatar mb-0">
          <Link to="/admin/profile" className="avatar avatar-sm me-2">
            <img alt={`foto de ${text}`} src={profiles[record.doctorEmail].thumb} />
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
      render: (text) => {
        const appointmentInitTime = dayjs(text);
        const appointmentEndTime = appointmentInitTime.add(1, "hour");

        return (
          <>
            <span>{dayjs(text).locale("es").format("D [de] MM [de] YYYY")}</span>
            <span className="text-primary d-block">{`${appointmentInitTime.format(
              "hh:mm A",
            )} - ${appointmentEndTime.format("hh:mm A")}`}</span>
          </>
        );
      },
      sorter: (a, b) => dayjs(a.date) - dayjs(b.date),
    },
    {
      title: "Estado",
      dataIndex: "status",
      render: (text) => <Switch className="custom-switch" checked={text === "active"} />,
    },
  ];

  const renderActionButton = () => (
    <Link className="btn btn-primary float-end mt-2" to="new">
      Agendar Cita
    </Link>
  );

  return (
    <Layout
      pageTitle="Citas"
      mainPage="Dashboard"
      mainPageUrl="/admin"
      currentPage="Citas"
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
                    showTotal: (total) => `${total} Citas en Total`,
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

export default Appointments;
