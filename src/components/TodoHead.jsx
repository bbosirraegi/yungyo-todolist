import React from 'react';
import styled from 'styled-components';
import { useTodoState } from "../TodoContext";

const TodoHeadBlock = styled.div`
    // 현재 날짜, 요일, 몇 개 항목이 안끝났는지 알려줄 거다
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef;

    // scss 문법
    h1 {
        margin: 0;
        font-size: 36px;
        color: #343a40;
    }

    .day {
        margin-top: 4px;
        color: #868e96;
        font-size: 21px;
    }

    .tasks-left {
        color: #20c997;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
    }
`;

function TodoHead() {
  // 현재 todos 가져오기
  const todos = useTodoState();
  // todo 항목들 중에서 done 값이 false 인 것만 가져오기
  const undoneTasks = todos.filter(todo => !todo.done);

  const today = new Date();
  // 오늘 날짜 (~년~월~일)
  const dateString = today.toLocaleDateString('ko-KR', {
    year : 'numeric',
    month : 'long',
    day: 'numeric'
  });
  // 오늘 요일 (~요일)
  const dayName = today.toLocaleDateString('ko-KR', {
    weekday: 'long'
  });

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
    </TodoHeadBlock>
  )
}

export default TodoHead;