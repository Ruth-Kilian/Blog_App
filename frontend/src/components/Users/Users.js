/* Users component to display a list of the current users for an admin user to manage*/

import React, { useEffect, useState } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import "./users.css";

// receives the userId as a prop from App.js
const Users = ({ userId }) => {
  // state variable to hold and set ALL the users' information
  const [users, setUsers] = useState([]);
  // state variable to manage the loading state:
  const [isLoading, setIsLoading] = useState(false);

  // fetches the list of users
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    // try-catch block for error handeling
    try {
      // sends a GET request to the server endpoint
      const response = await fetch("https://blogapp-mcqn.onrender.com/user");

      // sets the fetched users data
      if (response.ok) {
        const data = await response.json();
        const usersData = data.users;
        setUsers(usersData);
      } else {
        // log the error
        console.error("Failed to fetch users");
      }
      // catch and log the error
    } catch (error) {
      console.log(error);
    }
  };

  // handles the deletion of a user account by an admin user
  const handleDeleteAccount = async (userId) => {
    // set is loading to true
    setIsLoading(true);
    try {
      // sends a DELETE request to the server endpont with the userId and the token
      const response = await fetch(`https://blogapp-mcqn.onrender.com/admin/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your actual authentication token
        },
      });
      // status 200
      if (response.ok) {
        console.log("Deleted user");
        // remove the deleted user from the users list
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        // log the error
        console.error("Failed to delete user account");
      }
      // catch and log the error
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  // if the users is null then dispaly the loading message
  if (!users) {
    // use a spinner from bootstarp
    return (
      <Container fluid className="page-container">
        <h1 className="d-flex justify-content-center align-items-center loading-spinner">
          Loading Content
        </h1>
        <div className="d-flex justify-content-center align-items-center loading-spinner">
          <Spinner animation="border" role="status" variant="primary"></Spinner>
        </div>
      </Container>
    );
  }

  // filters out the currently logged in user from the list of users to prevent self-deletion
  const filteredUsers = users.filter((user) => user._id !== userId);

  // renders a container with the users' username and role with a delete button
  return (
    <Container>
      {filteredUsers.length > 0 ? (
        <ul className="user-list list-group">
          {filteredUsers.map((user) => (
            <li key={user._id} className="list-group-item user-item">
              <div className="username">
                <strong>Username:</strong> {user.username}
              </div>
              <div className="role">
                <strong>Role:</strong> {user.role}
              </div>
              <div className="delete-button">
                <Button
                  variant="danger"
                  onClick={() => handleDeleteAccount(user._id)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <FaTrash />
                  )}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h1>No users found.</h1>
      )}
    </Container>
  );
};

export default Users;
