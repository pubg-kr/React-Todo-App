import React, { useState, useRef, useCallback } from "react";
import MapContainer from "./components/MapContainer";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";

const createBulkTodos = () => {
  const todos = [];
  for (let i = 0; i < 25; i++) {
    todos.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return todos;
};

function App() {
  // const [todos, setTodos] = useState([
  //   //todos 초기값(원래는 리덕스에 저장)
  //   {
  //     id: 1, //스테이트 성격을 가진 변수지만 화면의 리레던링이랑 상관없음 이런경우uesref를 이용해 값 정의
  //     text: "리엑트 기초 알아보기",
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: "리엑트 컴포넌트 스타일링 해보기",
  //     checked: true,
  //   },
  //   {
  //     id: 3,
  //     text: "일정 관리 앱 만들기",
  //     checked: false,
  //   },
  // ]);

  const [todos, setTodos] = useState(createBulkTodos);

  const nextId = useRef(4); //ref객체를 가리킴 객체의 값을 읽어올떄 .current로 읽어옴

  const addTodo = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text: text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current = nextId.current + 1;
    },
    [todos], //이값이 새로생성되면 호출, 종속리스트
  );

  const removeTodo = useCallback((id) => {
    /*
    const newTodos = [...todos];
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].id === id) {
        newTodos.splice(i, 1);
        break;
      }
    }
    setTodos(newTodos);
    */
    // setTodos(todos.filter((todo) => todo.id !== id)); //filter(안에함수의 리턴값이 트루인것만 새로운 배열에 추가해줌, 폴스인)

    setTodos((list) => list.filter((todo) => todo.id !== id)); //filter(안에함수의 리턴값이 트루인것만 새로운 배열에 추가해줌, 폴스인)
  }, []);

  const toggleTodo = useCallback((id) => {
    // //아이디 같은 값 토글값 변경
    // setTodos(
    //   todos.map((todo) => {
    //     return todo.id === id ? { ...todo, checked: !todo.checked } : todo; //토글링
    //   }),
    // ); //map() 원레배열에 대해서 내부함수에서 리턴되는 값을 연결해 새로운 배열을 만들어줌

    //todos 스테이트에 종속 되는걸막기위해 새로운 list 생성하는 함수를 반환, 스테이트에 종속되면 자식 컴포넌트 전부 리렌더링 됨
    setTodos((list) =>
      list.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);

  return (
    <div>
      <TodoTemplate>
        <TodoInsert onInsert={addTodo} />
        <TodoList todos={todos} onRemove={removeTodo} onToggle={toggleTodo} />
      </TodoTemplate>
    </div>
  );
}
//<MapContainer></MapContainer>
export default App;
