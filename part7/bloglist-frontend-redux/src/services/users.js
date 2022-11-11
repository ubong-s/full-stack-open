import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/users';

const getAllUsers = async () => {
   const response = await axios.get(baseUrl);

   return response.data;
};

const getSingleUser = async (id) => {
   const response = await axios.get(`${baseUrl}/${id}`);

   return response.data;
};

export default { getAllUsers, getSingleUser };
