// components
import Title from "./components/Title";
import UsersList from "./components/UsersList";

// css
import "./app.css";

export default function App() {
  return (
    <main className="container">
      {/* including the Title as well as UsersList components */}
      <Title />
      <UsersList />
    </main>
  );
}
