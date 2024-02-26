import React, { useState, useEffect } from "react";
import "./style.css";

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolit");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputData, setData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [editItem, setEditItems] = useState("");
  const [toggleBtn, settoggleBtn] = useState(false);
  const addItems = () => {
    if (!inputData) {
      alert("plz fill the data");
    } else if (inputData && toggleBtn){
        setItems(
            items.map((curElem) => {
                if(curElem.id === editItem){
                    return {...curElem , name:inputData}
                } else {
                    return curElem;
                }
            })
        );
        setData("");
    setEditItems(null);
    settoggleBtn(false);
    }
    
    else {
      const setNewItem = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, setNewItem]);
      setData("");
    }
  };

  const editItems = (index) => {
    const editItems = items.find((curElem) => {
      return curElem.id === index;
    });
    setData(editItems.name);
    setEditItems(index);
    settoggleBtn(true);
  };

  const deleteItems = (index) => {
    const updateItem = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updateItem);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("mytodolit", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo"></img>
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add items"
              className="form-control"
              value={inputData}
              onChange={(e) => setData(e.target.value)}
            ></input>
            {toggleBtn ? (
              <i className="far fa-edit add-btn" onClick={addItems}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItems}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItems(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItems(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
