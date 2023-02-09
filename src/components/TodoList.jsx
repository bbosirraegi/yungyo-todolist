import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';
import TodoItem from './TodoItem'

// todohead 부분 뺀 나머지 부분 사용할건데, 잘 덮어지나 확인
const TodoListBlock = styled.div`
  flex: 1; // 자신이 차지할 수 있는 모든 영역 차지
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto; // 항목 많아지게 되면 스크롤바
  /* background: gray; 사이즈 조정이 잘 되고 있는지 확인하기 위한 임시 스타일 */
`;

function TodoList() {
  const todos = useTodoState();
  return (
    <TodoListBlock>
      {/* <TodoItem text="프로젝트 생성하기" done={true} /> 이거 바꾸기*/}
      {todos.map(todo => (
        <TodoItem //todos 값 보내주기
          key={todo.id} // key값 필수
          id={todo.id}
          text={todo.text}
          done={todo.done}
          emoji={todo.emoji}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;