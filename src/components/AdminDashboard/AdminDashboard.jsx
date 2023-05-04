import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './Admindash.css'
import { useEffect } from 'react';
import { getDailySails, getMonthlySails, getStatus } from '../../api/admin/admin';
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

const AdminDashboard = () => {
  const [series, setSeries] = useState([]);
  const [monthy,setMonthy]=useState([])
  const [daily,setDaily] = useState()
  const [data,setData] = useState([])
  const clonedArray = [...monthy]
 
  useEffect(() => {
    const fetchData = async () => {
      const response = await getStatus();
      setSeries(response.data);
      const response1 = await getMonthlySails()
      setMonthy(response1.data)
      const response2 = await getDailySails()
      console.log(response2);
      setDaily(response2.data.daily[0].total)
      setData(response2.data)
    };
    fetchData();
  }, []);
  const [options1, setOptions1] = useState({
    chart: {
      type: 'donut',
      width: '100%',
      height: '100%',
    },
    labels: ['Booked', 'Canceled'],
    colors: ['#4CAF50', '#F44336'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  });
  const serie = [{
    name: 'Sales',
    data: monthy
  }];
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Users by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  }
  const theme = useTheme();
  const year = monthy.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  const currentDate = new Date();
const currentMonth = currentDate.getMonth() ; // Adding 1 to get the month number from 1 to 12

  return (
          <>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
<div className="flex justify-center">
  <div className="flex-1 mr-1 ml-1">
  <div className="relative flex flex-col  min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border" style={{boxShadow:'0 0 10px rgba(0,0,0,0.5)'}} >
    <div className="flex-auto p-4" >
      <div className="flex flex-wrap -mx-3">
        <div className="flex-none w-2/3 max-w-full px-3">
          <div>
          <p className="mb-0 font-sans font-bold leading-normal text-md">Daily sail</p>
            <h3 className="font-bold text-2xl text-green-600">Rs.{daily}</h3>
          
          </div>
        </div>
        <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
          <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-green-700 to-green-500 shadow-soft-2xl">
            <i className="ni ni-money-coins text-lg relative top-3.5 text-white" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div className="flex-1 mr-1 ml-1">
  <div style={{boxShadow:'0 0 10px rgba(0,0,0,0.5)'}} className="  relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
    <div className="flex-auto p-4 ">
      <div className="flex flex-wrap -mx-3">
        <div className="flex-none w-2/3 max-w-full px-3">
          <div>
          <p className="mb-0 font-sans font-bold leading-normal text-md">Monthly sail</p>
            <h3 className="font-bold text-2xl text-yellow-600">Rs.{Math.floor(monthy[currentMonth])}</h3>
           
          </div>
        </div>
        <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
          <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-yellow-700 to-yellow-500 shadow-soft-2xl">
            <i className="ni ni-money-coins text-lg relative top-3.5 text-white" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div className="flex-1 mr-1 ml-1" >
  <div style={{boxShadow:'0 0 10px rgba(0,0,0,0.5)'}} className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
    <div className="flex-auto p-4" >
      <div className="flex flex-wrap -mx-3" >
        <div className="flex-none w-2/3 max-w-full px-3">
          <div>
          
            <p className="mb-0 font-sans font-bold leading-normal text-md">Yearly sail</p>
            <h3 className="font-bold text-2xl text-red-600"> Rs.{Math.floor(year)}</h3>
           
             
           
          </div>
        </div>
        <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
          <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-red-700 to-red-500 shadow-soft-2xl">
            <i className="ni ni-money-coins text-lg relative top-3.5 text-white" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>

</div>

            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"></div>
            </div>
            <div className="grid grid-cols- sm:grid-cols-2 gap-6 ">
              <div className="h-25">
              <h2 className="font-bold text-lg items-center  uppercase px-3 py-2">
                Latest booking status
                </h2>
                <ReactApexChart
                  options={options1}
                  series={series}
                  type="donut"
                />
              </div>
              <div className="h-80">
              <div className="flex flex-wrap mt-5">

  <div className="w-full md:w-1/2  p-3">
    {/*Metric Card*/}
    <div className=" border border-gray-800 rounded shadow p-2" style={{boxShadow:'0 0 10px rgba(0,0,0,0.5)'}} >
      <div className="flex flex-row items-center">
        <div className="flex-shrink pr-4">
          <div className="rounded p-3 bg-green-600"><i className="fa fa-wallet fa-2x fa-fw fa-inverse" /></div>
        </div>
        <div className="flex-1 text-right md:text-center">
          <h5 className="font-bold uppercase text-gray-400">Total Revenue</h5>
          <h3 className="font-bold text-3xl text-gray-600">Rs.{Math.floor(year)} <span className="text-green-500"><i className="fas fa-caret-up" /></span></h3>
        </div>
      </div>
    </div>
    {/*/Metric Card*/}
  </div>
  <div className="w-full md:w-1/2  p-3">
    {/*Metric Card*/}
    <div className="border border-gray-800 rounded shadow p-2" style={{boxShadow:'0 0 10px rgba(0,0,0,0.5)'}} >
      <div className="flex flex-row items-center">
        <div className="flex-shrink pr-4">
          <div className="rounded p-3 bg-pink-600"><i className="fas fa-users fa-2x fa-fw fa-inverse" /></div>
        </div>
        <div className="flex-1 text-right md:text-center">
          <h5 className="font-bold uppercase text-gray-400">Total Users</h5>
          <h3 className="font-bold text-3xl text-gray-600">{data.userCount} <span className="text-pink-500"><i className="fas fa-exchange-alt" /></span></h3>
        </div>
      </div>
    </div>
    {/*/Metric Card*/}
  </div>
  <div className="w-full md:w-1/2  p-3">
    {/*Metric Card*/}
    <div className=" border border-gray-800 rounded shadow p-2" style={{boxShadow:'0 0 10px rgba(0,0,0,0.5)'}}>
      <div className="flex flex-row items-center">
      <div className="flex-shrink pr-4">
          <div className="rounded p-3 bg-blue-600"><i className="fas fa-users fa-2x fa-fw fa-inverse" /></div>
        </div>
        <div className="flex-1 text-right md:text-center">
          <h5 className="font-bold uppercase text-gray-400">Total Theatre</h5>
          <h3 className="font-bold text-3xl text-gray-600">{data.ownerCount}<span className="text-blue-600"><i className="fas fa-exchange-alt" /></span></h3>
        </div>
      </div>
    </div>
    {/*/Metric Card*/}
  </div>
       
        <div className="w-full md:w-1/2  p-3">
          {/*Metric Card*/}
          <div className=" border border-gray-800 rounded shadow p-2" style={{boxShadow:'0 0 10px rgba(0,0,0,0.5)'}}>
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-red-600"><i className="fas fa-inbox fa-2x fa-fw fa-inverse" /></div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-400">Running Movies</h5>
                <h3 className="font-bold text-3xl text-gray-600">{data.movieCount} <span className="text-red-500"><i className="fas fa-caret-up" /></span></h3>
              </div>
            </div>
          </div>
          {/*/Metric Card*/}
        </div>
        <div className="w-full md:w-1/2  p-3">
    {/*Metric Card*/}
    <div className=" border border-gray-800 rounded shadow p-2" style={{boxShadow:'0 0 10px rgba(0,0,0,0.5)'}}>
      <div className="flex flex-row items-center">
        <div className="flex-shrink pr-4">
          <div className="rounded p-3 bg-purple-600"><i className="fa fa-calendar fa-2x fa-fw fa-inverse" /></div>
        </div>
        <div className="flex-1 text-right md:text-center">
          <h5 className="font-bold uppercase text-gray-400">Active Booking</h5>
          <h3 className="font-bold text-3xl text-gray-600">{data.activeCount} <span className="text-purple-500"><i className="fas fa-caret-up" /></span></h3>
        </div>
      </div>
    </div>
    {/*/Metric Card*/}
  </div>
  <div className="w-full md:w-1/2  p-3">
    {/*Metric Card*/}
    <div className=" border border-gray-800 rounded shadow p-2" style={{boxShadow:'0 0 10px rgba(0,0,0,0.5)'}}>
      <div className="flex flex-row items-center">
        <div className="flex-shrink pr-4">
          <div className="rounded p-3 bg-yellow-600"><i className="fa fa-calendar fa-2x fa-fw fa-inverse" /></div>
        </div>
        <div className="flex-1 text-right md:text-center">
          <h5 className="font-bold uppercase text-gray-400">Expired Bookings</h5>
          <h3 className="font-bold text-3xl text-gray-600">{data.expiredCount} <span className="text-yellow-500"><i className="fas fa-caret-down" /></span></h3>
        </div>
      </div>
    </div>
    {/*/Metric Card*/}
  </div>
  
      </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
            <Grid item xs={12} md={6}>
          <Card
            sx={{
              boxShadow: theme.shadows[4],
              borderRadius: theme.shape.borderRadius,
              padding: theme.spacing(5),
            }}
          >
            <ReactApexChart
              options={options}
              series={serie}
              type="line"
              height={350}
            />
          </Card>
        </Grid>
            </div>
          </div>
          </> 
  );
};

export default AdminDashboard

