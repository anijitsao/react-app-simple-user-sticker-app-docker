export async function fetchUsers() {
  // "use server";
  const users = [
    {
      _id: 1,
      name: "Anijit Sau",
      designation: "Developer",
    },
    {
      _id: 2,
      name: "Paul Andif",
      designation: "Explorer",
    },
    {
      _id: 3,
      name: "Mark Twain",
      designation: "Writer",
    },
    {
      _id: 4,
      name: "Paul White",
      designation: "Designer",
    },
  ];
  return users;
}
