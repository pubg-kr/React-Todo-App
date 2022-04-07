import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import "../styles/TodoInsert.scss";

const TodoInsert = ({ onInsert }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    onInsert(text);
    setText("");
    e.preventDefault(); //서브밋버튼 이 원래 가지고 있는 디폴트 동작 하지않도록 설정
    console.log("onSubmit...");
  };

  return (
    <form className="TodoInsert" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력하세요..."
        value={text}
        onChange={handleChange}
      ></input>
      <button type="submit">
        {" "}
        {
          //엔터키 치면 자동으로 들어감
        }
        <MdAdd />
      </button>
    </form>
  );
};

export default React.memo(TodoInsert);
