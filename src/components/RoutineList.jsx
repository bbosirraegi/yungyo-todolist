import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';
import RoutineItem from './RoutineItem';

// todohead 부분 뺀 나머지 부분 사용할건데, 잘 덮어지나 확인
const RoutineListBlock = styled.div`
  flex: 1; // 자신이 차지할 수 있는 모든 영역 차지
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto; // 항목 많아지게 되면 스크롤바
  /* background: gray; //사이즈 조정이 잘 되고 있는지 확인하기 위한 임시 스타일 */
`;

function RoutineList() {
  const todos = useTodoState();
  return (
    <RoutineListBlock>
      {todos.map((todo) =>
        todo.routine ? (<RoutineItem todo={todo}/>) : null
        // 만약 routine이 true라면 todo 값을 업데이트.
      )}
    </RoutineListBlock>
  );
}

export default RoutineList;