import "../PromotionTabel/PromotionTabel.css";
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";

export default function PromotionTabel({ rows }) {
  const [data, setData] = useState(rows);

  useEffect(() => {
    setData(rows);
  }, [rows]);

  const columns = [
    {
      name: "userId",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "startDate",
      label: "Start Date",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "endDate",
      label: "End Date",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "promoCode",
      label: "Promo Code",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "percentage",
      label: "Percentage",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    selectableRowsHideCheckboxes: true,
  };

  return (
    <div className="PromotionsForm">
      <div className="Formtable">
        <MUIDataTable
          title={"Promotions"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
}