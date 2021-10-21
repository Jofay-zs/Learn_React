// import axios from "axios";
// import { nanoid } from "nanoid";
// import React from "react";
// import { useRef } from "react";
// import { useEffect, useState } from "react";
// import { getVehiclesApi, getUsers } from "utils/api";
// import { toast } from "react-toastify";

// const Sales = () => {
//   const [users, setUsers] = useState([]);
//   const [vehicles, setVehicles] = useState([]);
//   const form = useRef(null);

//   useEffect(() => {
//     getVehiclesApi(setVehicles);
//     getUsers(setUsers);
//   }, []);

//   const submitForm = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(form.current);
//     const newSale = {};

//     formData.forEach((value, key) => {
//       newSale[key] = value;
//     });

//     var data = newSale;

//     var config = {
//       method: "POST",
//       url: "http://localhost:5000/sales/",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: data,
//     };

//     const establishedInformation = {
//       value: newSale.saleValue,
//       vehicle: vehicles.filter((el) => el._id === newSale.vehicle)[0],
//       vendor: users.filter((el) => el._id === newSale.vendor)[0],
//     };

//     await axios(config)
//       .then(function (response) {
//         toast.success("Successfully added sale 🦼", {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       })
//       .catch(function (error) {
//         console.log(error);
//         toast.error("Error adding sale 😢", {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       });
//   };

//   return (
//     <div>
//       Create new sale
//       <form action="" ref={form} onSubmit={submitForm}>
//         <label htmlFor="vendor">
//           Select Vendor
//           <select name="vendor" id="">
//             {users.map((u) => {
//               return (
//                 <option key={nanoid()} value={u._id}>
//                   {u.email}
//                 </option>
//               );
//             })}
//           </select>
//         </label>
//         <label htmlFor="vehicle">
//           Select vehicle
//           <select name="vehicle" id="">
//             {vehicles.map((u) => {
//               return (
//                 <option key={nanoid()} value={u._id}>
//                   {u.name}
//                 </option>
//               );
//             })}
//           </select>
//         </label>
//         <label htmlFor="saleValue">
//           Insert Value
//           <input type="number" name="saleValue" />
//         </label>
//         <button type="submit">Send sale</button>
//       </form>
//     </div>
//   );
// };

// export default Sales;
