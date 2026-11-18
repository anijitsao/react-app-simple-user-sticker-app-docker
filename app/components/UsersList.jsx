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
    allUsersFetched: false,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // when the component is mounted get all users from back end
  useEffect(() => {
    getAllUsers();
  }, [currentIndex]);

  // get all the users
  const getAllUsers = async () => {
    try {
      if (!userData.allUsersFetched) {
        const response = await fetchUsers(currentIndex);

        console.log("response is here ", response);

        // use call back style to stop the stale state problems
        setUserData(function (prevState) {
          return {
            ...prevState,
            allUsers:
              prevState.allUsers[0]?._id !== response[0]?._id
                ? [...prevState.allUsers, ...response]
                : [...prevState.allUsers],
            allUsersFetched: response.length === 0,
          };
        });
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
    if (!userData.allUsersFetched) {
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
