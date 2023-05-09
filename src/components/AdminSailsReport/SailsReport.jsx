import React, { useContext, useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { GridArrowDownwardIcon } from "@mui/x-data-grid";
import { getAllorders } from "../../api/admin/admin";

const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [reload, setReload] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(()=>{
    const fetchData =async()=>{
  const response =await getAllorders()
  setSales(response.data)
    }
    fetchData()
  },[])

  const handleDateChange = (e) => {
    if (e.target.id === "startDate") {
      setStartDate(e.target.value);
      document.getElementById("endDate").setAttribute("min", e.target.value);
    } else if (e.target.id === "endDate") {
      setEndDate(e.target.value);
      document.getElementById("startDate").setAttribute("max", e.target.value);
    }
  };

  const columns = [
    {
      field: "index",
      headerName: "#",
      width: 100,
      renderCell: (params) => {
        const rowId = params.row._id;
        const rowIndex = sales.findIndex((row) => row._id === rowId);
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      field: "ownerName",
      headerName: "Theatre Name",
      width: 200,
      renderCell: (params) => (
        <span>{params.value }</span>
      ),
    },
    {
      field: "userName",
      headerName: "User Name",
      width: 200,
      renderCell: (params) => (
        <span>{params.value }</span>
      ),
    },
    {
      field: "movieName",
      headerName: "Movie",
      width: 200,
      
      renderCell: (params) => (
        <span>{params.value }</span>
      ),
    },
    {
      field: "date",
      headerName: "Show date",
      width: 200,
      
      renderCell: (params) => (
        <span>{new Date(params.value).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      ),
    },
    {
      field: "showTime",
      headerName: "Time",
      width: 200,
      
      renderCell: (params) => (
        <span>{params.value }</span>
      ),
    },
    {
      field: "screen",
      headerName: "Screen No",
      width: 200,
      renderCell: (params) => <span>{params.value}</span>,
    },
 
    {
      field: "selectedSeats",
      headerName: "Selected Seats",
      width: 200,
      renderCell: (params) => (
        <span>{params.value.map((value) => value.id).join(", ")}</span>

      ),
    },
    {
      field: "total",
      headerName: "Total price",
      width: 200,
      renderCell: (params) => (
        <span>{params.value}</span>

      ),
    },
  ];

  const CustomToolbar = () => {
    const handleExport = () => {
      console.log("herre");
      // Get the current data from the DataGrid
      const data = sales.map((row) => ({
        ...row,
        patientId: row.patientId ? row.patientId.fullName : "",
        doctorId: row.doctorId ? `Dr ${row.doctorId.fullName}` : "",
      }));

      // Convert the data to CSV format
      const csv = new Blob([Papa.unparse(data)], {
        type: "text/csv;charset=utf-8",
      });

      // Download the CSV file
      saveAs(csv, "data.csv");
    };
    return (
      <div className="w-full flex justify-end mb-2">
        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector className="me-2" />
          <Button
            onClick={handleExport}
            variant="text"
            color="inherit"
            size="small"
            startIcon={<GridArrowDownwardIcon/>}
            className="text-primary "
          >
            export
          </Button>
        </GridToolbarContainer>
      </div>
    );
  };

  return (
    <div className="m-4" style={{width:'160vh'}}>
      <h2 className="font-bold text-lg uppercase  ">
     Sails Report
    </h2>
    <div className="dataTable w-100">
      <Toaster />
      <div className="flex mb-2 w-full justify-end ">
        <input
          type="date"
          id="startDate"
          className="me-2 rounded-md border border-gray-300 p-2"
          onChange={handleDateChange}
        />
        <input
          type="date"
          id="endDate"
          className="rounded-md border border-gray-300 p-2 me-2"
          onChange={handleDateChange}
        />
      </div>
      <DataGrid
        getRowId={(row) => row._id}
        rows={sales}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        rowsPerPageOptions={[1]}
        disableSelectionOnClick
        components={{ Toolbar: CustomToolbar }}
      />
    </div>
    </div>
  );
};

export default SalesReport;