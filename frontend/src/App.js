import { useState, useEffect } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch all users from the backend
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://127.0.0.1:5000/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://127.0.0.1:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, age }),
    });

    const data = await response.json();
    setMessage(data.message);

    // Refresh the users list after submission
    fetchUsers();

    // Clear input fields
    setUsername("");
    setAge("");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Submit Your Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}

      <h3>All Users</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username} - {user.age} years old</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
