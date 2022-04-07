import React, { Children } from "react";
import "../styles/TodoTemplate.scss";

const TodoTemplate = ({ children }) => {
  return (
    <div class="TodoTemplate">
      <div class="app-title">일정 관리</div>
      <div class="content">{children}</div>
    </div>
  );
};

export default TodoTemplate;
