import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser, fetchUsers, updateUser } from '../../Redux/Actions/UserActions';

const CreateUser = ({handleCloseModal,totalPages,userToEdit,isEdit}) => {
    const [userData, setUserData] = useState({
        first_name: isEdit ? userToEdit.first_name : '',
        last_name: isEdit ? userToEdit.last_name : '',
        email: isEdit ? userToEdit.email: '',
        domain: isEdit ? userToEdit.domain : '',
        available: isEdit ? userToEdit.available : '',
        avatar: isEdit ? userToEdit.avatar : '',
        gender: isEdit ? userToEdit.gender : '',
      });
    
      const dispatch = useDispatch();
      const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
      };
      const handleCreateUser = async (e) => {
        e.preventDefault();
      
        try {
           // If isEdit is provided, update the user
      if (isEdit) {
        await dispatch(updateUser(userToEdit._id, userData));
      } 
        await dispatch(createUser(userData));
    if (isEdit) {
        dispatch(fetchUsers({ page: Math.floor(userToEdit.id / 20) + 1 }));
    }
    dispatch(fetchUsers({ page: totalPages}));
          // Clear userData after submission
          setUserData({
            first_name: '',
            last_name: '',
            email: '',
            domain: '',
            available: '',
            avatar: '',
            gender: '',
          });
      
          handleCloseModal(e);
        } catch (error) {
          console.error('Error creating/updating user:', error);
        }
      };
    
      
  return (
    <div className="max-w-md mx-auto bg-black text-white p-8 shadow-md rounded-xl mt-10 relative z-50 mb-2">
      <h2 className="text-2xl font-semibold mb-4">{isEdit ? 'Edit User' : 'Create User'}</h2>
      <form className="space-y-4 " onSubmit={handleCreateUser}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium ">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={userData.first_name}
              minLength={3}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 bg-gray-900"
              placeholder="Enter first name"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium ">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={userData.last_name}
              minLength={1}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 bg-gray-900"
              placeholder="Enter last name"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium ">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            minLength={8}
              required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 bg-gray-900"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="domain" className="block text-sm font-medium ">
            Domain
          </label>
          <input
            type="text"
            id="domain"
            name="domain"
            value={userData.domain}
            minLength={2}
              required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 bg-gray-900"
            placeholder="Enter domain"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="available" className="block text-sm font-medium ">
              Availability
            </label>
            <select
              id="available"
              name="available"
              required
              value={userData.available}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500  bg-gray-900"
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium ">
              Avatar URL
            </label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              required
              value={userData.avatar}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 bg-gray-900"
              placeholder="Enter avatar URL"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium ">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={userData.gender}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 bg-gray-900"
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Agender">Agender</option>
          <option value="Bigender">Bigender</option>
          <option value="Polygender">Polygender</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Genderfluid">Genderfluid</option>
          <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800"
        >
           {isEdit ? 'Update User' : 'Create User'}
        </button>
      </form>
      <div>
      <button
            className=" p-1 rounded-xl hover:opacity-70 absolute top-0 right-2"
            onClick={handleCloseModal}
          >
            <i className="fa-regular fa-circle-xmark fa-lg opacity-60"></i>
          </button>
      </div>
    </div>
  );
};

export default CreateUser;
