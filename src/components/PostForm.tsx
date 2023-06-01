import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "./config";

const PostForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/addUser`, {
        username: username,
        email: email,
        password: password,
      });

      if (response.status === 200) {
        console.log("Data saved successfully.");
        // Reset form fields
        setUsername("");
        setEmail("");
        setPassword("");
        setErrorMessage("");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while saving the data.");
    }
  };

  return (
    <div>
      <h1>Post Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default PostForm;