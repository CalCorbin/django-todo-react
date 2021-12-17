import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';

const toDoApi = '/api/todos/';
const headers = {
  'Content-Type': 'application/json',
};

function App() {
  const [todoList, setTodoList] = useState([]);
  const [displayCompleted, setDisplayCompleted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState({});

  const fetchData = async () => {
    const response = await fetch('/api/todos/');
    return response.json();
  };

  useEffect(() => {
    let mounted = true;

    fetchData().then((data) => {
      if (!mounted) return;

      setTodoList(data);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = (item) => {
    setModalOpen(false);

    if (item.id) {
      fetch(`${toDoApi}${item.id}/`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(item),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not OK');
          fetchData().then((data) => {
            setTodoList(data);
          });
        })
        .catch((error) => {
          console.error(
            'There has been a problem with your PUT operation:',
            error
          );
        });

      return;
    }

    fetch(toDoApi, {
      method: 'POST',
      headers,
      body: JSON.stringify(item),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not OK');
        fetchData().then((data) => {
          setTodoList(data);
        });
      })
      .catch((error) => {
        console.error(
          'There has been a problem with your POST operation:',
          error
        );
      });
  };

  const handleDelete = (item) => {
    fetch(`${toDoApi}${item.id}/`, {
      method: 'DELETE',
      headers,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not OK');
        fetchData().then((data) => {
          setTodoList(data);
        });
      })
      .catch((error) => {
        console.error(
          'There has been a problem with your DELETE operation:',
          error
        );
      });
  };

  const addTask = () => {
    setModalOpen(true);
    setActiveItem({ title: '', description: '', completed: false });
  };

  const editItem = (item) => {
    setActiveItem(item);
    setModalOpen(true);
  };

  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => setDisplayCompleted(true)}
          className={displayCompleted ? 'nav-link active' : 'nav-link'}
        >
          Complete
        </span>
        <span
          onClick={() => setDisplayCompleted(false)}
          className={displayCompleted ? 'nav-link' : 'nav-link active'}
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
            displayCompleted ? 'completed-todo' : ''
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => editItem(item)}
          >
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => handleDelete(item)}>
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
              <button className="btn btn-primary" onClick={addTask}>
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
      {modalOpen ? (
        <Modal
          activeItem={activeItem}
          toggle={() => setModalOpen(false)}
          onSave={handleSubmit}
        />
      ) : null}
    </main>
  );
}

export default App;
