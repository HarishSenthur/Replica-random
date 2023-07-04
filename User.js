import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Rating } from 'react-simple-star-rating';
import './user.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();
        setUsers(data.results);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedUsers = Array.from(users);
    const [draggedUser] = updatedUsers.splice(result.source.index, 1);
    updatedUsers.splice(result.destination.index, 0, draggedUser);

    setUsers(updatedUsers);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="app">
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search users..."
          />
        </div>
        <Droppable droppableId="userList">
          {(provided) => (
            <div
              className="user-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {filteredUsers.map((user, index) => (
                <Draggable key={user.login.uuid} draggableId={user.login.uuid} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={`user-container ${snapshot.isDragging ? 'dragging' : ''}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="user-image-container">
                        <img className="user-picture" src={user.picture.medium} alt="User Profile" />
                      </div>
                      <div className="user-details-container">
                        <div className="user-name">{`${user.name.first} ${user.name.last}`}</div>
                        <div className="user-cell">{user.cell}</div>
                        <div className="user-email">{user.email}</div>
                        <div className="user-rating">
                          <Rating initialValue={Math.random() * 5} readonly />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;


