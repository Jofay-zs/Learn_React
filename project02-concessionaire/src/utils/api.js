import axios from "axios";

export const getVehicle = async (setVehicles, setRunQuery) => {
  const options = { method: "GET", url: "http://localhost:5000/cars/" };
  await axios
    .request(options)
    .then(function (response) {
      setVehicles(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setRunQuery(false);
};
