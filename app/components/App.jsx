// components
import Title from "./Title";
import UsersList from "./UsersList";

// css
import "../styles/app.css";

export default function App() {
  return (
    <main className="container">
      {/* including the Title as well as UsersList components */}
      <Title />
      <UsersList />
    </main>
  );
}
