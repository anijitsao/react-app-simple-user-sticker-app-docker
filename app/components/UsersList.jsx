"use client";
import { useEffect, useState } from "react";

// components
import UserCard from "./UserCard";

// server functions
import { fetchUsers } from "../actions/user.actions";

const UsersList = () => {
  // Initial state and its modifier function
  const [userData, setUserData] = useState({
    allUsers: [],
    totalUsersFetched: false,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // when the component is mounted get all users from back end
  useEffect(() => {
    getAllUsers();
  }, [currentIndex]);

  // get all the users
  const getAllUsers = async () => {
    try {
      if (!userData.totalUsersFetched) {
        const response = await fetchUsers(currentIndex);

        console.log("response is here ", response);

        // fill the users array of the state
        if (response.length > 0) {
          setUserData({
            ...userData,
            allUsers: [...userData.allUsers, ...response],
          });
        } else {
          setUserData({
            ...userData,
            totalUsersFetched: true,
          });
        }
      }
    } catch (error) {
      console.log("Some Error occurred...", error);
    }
  };

  const handleScroll = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    const bottom = scrollHeight - parseInt(scrollTop) - clientHeight;
    // fixing for Chrome
    if (bottom <= 2) {
      console.log("Bottom reached");
      loadMoreUsers();
    }
  };

  const loadMoreUsers = () => {
    if (!userData.totalUsersFetched) {
      // update the current index
      setCurrentIndex(
        currentIndex +
          Number(process.env.NEXT_PUBLIC_PERMISSIBLE_USERS_TO_SHOW),
      );
    }
  };

  // copying predefined number of users from the state
  const users = userData.allUsers;

  return (
    <section className="users-list" onScroll={handleScroll}>
      {users?.length > 0
        ? users.map((user) => {
            return <UserCard {...user} key={user._id} />;
          })
        : "Loading users..."}
    </section>
  );
};

export default UsersList;
