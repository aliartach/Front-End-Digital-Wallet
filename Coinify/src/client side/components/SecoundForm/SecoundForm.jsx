import "../SecoundForm/SecoundForm.css";
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
export default function StickyHeadTable({ rows }) {
  const [data, setData] = useState(rows);

  const columns = [
    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "id",
      label: "Transaction Id",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "senderId",
      label: "Sender Email",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const rowData = data[tableMeta.rowIndex];
          const senderEmail = rowData.sender?.email;

          return senderEmail ? senderEmail : "N/A";
        },
      },
    },
    {
      name: "receiverId",
      label: "Receiver Email",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const rowData = data[tableMeta.rowIndex];
          const receiverEmail = rowData.receiver?.email;

          return receiverEmail ? receiverEmail : "N/A";
        },
      },
    },
    {
      name: "amount",
      label: "Amount",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const rowData = data[tableMeta.rowIndex];
          const promoCode = rowData.promotion?.promoCode;

          return "$" + value;
        },
      },
    },
    {
      name: "moneyType",
      label: "Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "promotion",
      label: "Promo Code",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const rowData = data[tableMeta.rowIndex];
          const promoCode = rowData.promotion?.promoCode;

          return promoCode ? promoCode : "N/A";
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    selectableRowsHideCheckboxes: true,
  };

  return (
    <div className="TransactionForm">
      <div className="Formtable">
        <MUIDataTable
          title={"All transactions"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
}
