import React, { useState, useEffect } from "react";
// import Modal from "./components/Modal";
// import axios from "axios";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [displayCompleted, setDisplayCompleted] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const response = await fetch("/api/todos/");
      return response.json();
    };

    fetchData().then((data) => {
      if (!mounted) return;

      setTodoList(data);
    });

    return () => {
      mounted = false;
    };
  }, []);

  // const refreshList = () => {
  //   axios
  //     .get("/api/todos/")
  //     .then((res) => this.setState({ todoList: res.data }))
  //     .catch((err) => console.log(err));
  // };

  // const toggle = () => {
  //   this.setState({ modal: !this.state.modal });
  // };
  //
  // const handleSubmit = (item) => {
  //   this.toggle();
  //
  //   if (item.id) {
  //     axios
  //       .put(`/api/todos/${item.id}/`, item)
  //       .then((res) => this.refreshList());
  //     return;
  //   }
  //   axios.post("/api/todos/", item).then((res) => this.refreshList());
  // };
  //
  // const handleDelete = (item) => {
  //   axios.delete(`/api/todos/${item.id}/`).then((res) => this.refreshList());
  // };
  //
  const createItem = () => {
    console.log("createItem");
    // const item = { title: "", description: "", completed: false };

    // this.setState({ activeItem: item, modal: !this.state.modal });
  };

  // const editItem = (item) => {
  //   this.setState({ activeItem: item, modal: !this.state.modal });
  // };
  //
  // const toggleTabs = (status) => {
  //   // if (status) {
  //   // return this.setState({ viewCompleted: true });
  //   // }
  //   // return this.setState({ viewCompleted: false });
  //   return setDisplayCompleted(status);
  // };

  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => setDisplayCompleted(true)}
          className={displayCompleted ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => setDisplayCompleted(false)}
          className={displayCompleted ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  const renderItems = () => {
    const itemList = todoList.filter(
      (item) => item.completed === displayCompleted
    );

    return itemList.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            displayCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            // onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            // onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  return (
    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button className="btn btn-primary" onClick={createItem}>
                Add task
              </button>
            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush border-top-0">
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
