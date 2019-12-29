import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";

function usePost(id) {
  const [post, setPost] = useState({});
  const [loading, toggleLoading] = useState(true);

  useEffect(() => {
    if (id > 100 || id === "") {
      return;
    }
    toggleLoading(true);
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => {
      setPost(res.data);
      toggleLoading(false);
    });
  }, [id]);

  return [loading, post];
}

function App() {
  const [post, setPost] = useState({});
  const [selectedId, setId] = useState(1);
  const [loading, toggleLoading] = useState(true);

  // const [loading, post] = usePost(selectedId);

  function fetchPost(id) {
    if (id > 100 || id === "") {
      return;
    }
    toggleLoading(true);
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => {
      setPost(res.data);
      toggleLoading(false);
    });
  }
  useEffect(() => {
    fetchPost(selectedId);
  }, [selectedId]);

  const { title, body } = post;
  if (loading) {
    return <>Loading...</>;
  }
  return (
    <>
      <h1>Enter post Id to fetch post</h1>
      <input
        type="number"
        name="selectedId"
        defaultValue={selectedId}
        onChange={event => setId(event.target.value)}
      />
      {selectedId > 100 && <p>id should be less than or equal to 100</p>}
      <h3>Post Details</h3>
      <div>
        <h4>Title :</h4> {title && title}
      </div>
      <div>
        <h4>Body : </h4>
        {body && body}
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
