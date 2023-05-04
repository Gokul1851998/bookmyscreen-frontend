import { useEffect, useState } from "react";
import {
  addScreen,
  deleteScreen,
  editScreen,
  getCurrentOwner,
  getScreen,
} from "../../api/owner/ownerInstance";
import { useSelector, useDispatch} from "react-redux";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { setOwner } from "../../redux/ownersSlice";

function OwnerScreen() {
  const owner = useSelector((state) => state.owners.owner);
  
  const [showModal, setShowModal] = useState(false);
  const [screen, setScreen] = useState("");
  const [rows, setRows] = useState("");
  const [columns, setColumns] = useState("");
  const [screens, setScreens] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [newId, setNewId] = useState("");
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchData = async () => {
    const response1 = await getCurrentOwner();
    if (response1.success) {
      dispatch(setOwner(response1.data));
    }
  }
  fetchData()
  },[])
  useEffect(() => {
    const fetchData = async () => {
      try {
       
        if (owner) {
          const response = await getScreen(owner._id);
          if (response.success) {
            setScreens(response.data);
          } else {
            toast.error(response.message);
          }
        }
        // setScreens(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function toggleModal() {
    setShowModal(!showModal);
  }

  function actionModal() {
    setEditModal(!editModal);
  }

  const screenData = {
    owner,
    screen,
    rows,
    columns,
  };

  const editData = {
    owner,
    newId,
    screen,
    rows,
    columns,
  };

  const handleAccept = async (e) => {
    e.preventDefault();
    const response = await addScreen(screenData);
    if (response.success) {
      console.log(response);
      setScreens(response.data);
      toast.success("Screen added successfully");
      toggleModal();
    } else {
      toast.error(response.message);
    }
  };

  const editAccept = async (e) => {
    e.preventDefault();
    const response = await editScreen(editData);
    if (response.success) {
      setScreens(response.data);
      toast.success(response.message);
      actionModal();
    } else {
      toast.error("Something went Wrong");
    }
  };

  function handleDecline() {
    toggleModal();
  }
  function closeModal() {
    actionModal();
  }

  const handelDetete = (screenId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are deleting a Screen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteScreen({ screenId });
        if (response.success) {
          Swal.fire(response.message);
          setScreens(response.data);
        }
      }
    });
  };

  return (
    <>
      <div className="ml-10 mr-10" style={{ overflowX: "auto" }}>
        <div className="flex justify-between mb-3 mt-3">
          <h2 className="font-bold text-lg uppercase px-3 py-2">Screen List</h2>
          <button
            onClick={toggleModal}
            className=" bg-green-600 hover:bg-green-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Add
          </button>
        </div>
        <div className="overflow-x-auto">
          <table
            className="table-auto min-w-full divide-y divide-gray-300"
            style={{ border: "0.5px solid black" }}
          >
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold uppercase">
                  No
                </th>
                <th className="px-6 py-4 text-left font-semibold uppercase">
                  Screen Number
                </th>
                <th className="px-6 py-4 text-left font-semibold uppercase">
                  Rows
                </th>
                <th className="px-6 py-4 text-center font-semibold uppercase">
                  Columns
                </th>
                <th className="px-6 py-4 text-center font-semibold uppercase">
                  Total Seats
                </th>
                <th className="px-6 py-4 text-center font-semibold uppercase">
                  Action
                </th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {screens.map((list, index) => (
                <tr key={list._id}>
                  <td className="px-6 py-4  text-center">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-center">
                    {list.screen}
                  </td>
                  <td className="px-6 py-4 font-semibold text-center">
                    {list.rows}
                  </td>
                  <td className="px-6 py-4 font-semibold text-center">
                    {list.columns}
                  </td>
                  <td className="px-6 py-4 font-semibold text-center">
                    {list.totalSeats}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => (setEditModal(true), setNewId(list._id))}
                      type="button"
                      className="inline-block mr-2 rounded bg-info px-6 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handelDetete(list._id)}
                      type="button"
                      className="inline-block rounded bg-danger px-6 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            <button type="button" className="inline-block rounded  mr-4">
              <i
                className="fas fa-chevron-left"
                style={{ fontSize: "1.5em" }}
              ></i>
            </button>
            <button type="button" className="inline-block rounded ">
              <i
                className="fas fa-chevron-right"
                style={{ fontSize: "1.5em" }}
              ></i>
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <form onSubmit={handleAccept}>
          <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full flex justify-center items-center">
            <div className="relative w-full h-full max-w-2xl md:h-auto">
              <div
                className=" rounded-lg shadow "
                style={{ backgroundColor: "#49154e" }}
              >
                <div className=" p-4 border-b rounded-t dark:border-gray-600 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add Screen
                  </h3>
                </div>
                <div className=" m-3 grid gap-6 mb-2 ">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Screen Number
                    </label>
                    <input
                      type="number"
                      onChange={(e) => setScreen(e.target.value)}
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Number of Rows
                    </label>
                    <input
                      type="number"
                      onChange={(e) => setRows(e.target.value)}
                      id="last_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Number of Columns
                    </label>
                    <input
                      type="number"
                      onChange={(e) => setColumns(e.target.value)}
                      id="company"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="defaultModal"
                    type="submit"
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Add
                  </button>
                  <button
                    data-modal-hide="defaultModal"
                    onClick={handleDecline}
                    type="button"
                    className="text-gray-500 bg-red-700 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-red-700 dark:text-gray-300 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {editModal && (
        <form onSubmit={editAccept}>
          <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full flex justify-center items-center">
            <div className="relative w-full h-full max-w-2xl md:h-auto">
              <div
                className=" rounded-lg shadow "
                style={{ backgroundColor: "#49154e" }}
              >
                <div className=" p-4 border-b rounded-t dark:border-gray-600 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Screen
                  </h3>
                </div>
                <div className=" m-3 grid gap-6 mb-2 ">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Screen Number
                    </label>
                    <input
                      type="number"
                      onChange={(e) => setScreen(e.target.value)}
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Number of Rows
                    </label>
                    <input
                      type="number"
                      onChange={(e) => setRows(e.target.value)}
                      id="last_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Number of Columns
                    </label>
                    <input
                      type="number"
                      onChange={(e) => setColumns(e.target.value)}
                      id="company"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="defaultModal"
                    type="submit"
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Add
                  </button>
                  <button
                    data-modal-hide="defaultModal"
                    onClick={closeModal}
                    type="button"
                    className="text-gray-500 bg-red-700 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-red-700 dark:text-gray-300 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default OwnerScreen;
