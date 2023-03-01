import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodoState } from "../TodoContext";
import RoutineTemplate from './RoutineTemplate';
import RoutineHead from './RoutineHead';
import RoutineList from './RoutineList';

const TodoHeadBlock = styled.div`
    // 현재 날짜, 요일, 몇 개 항목이 안끝났는지 알려줄 거다
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef;
    position: relative;

    // scss 문법
    h1 {
        margin: 0;
        font-size: 36px;
        color: #343a40;
    }

    .dayroutine {
      display: flex;
    }

    .day {
        margin-top: 4px;
        color: #868e96;
        font-size: 21px;
    }

    .tasks {
      display: flex;
      justify-content: space-between;
      // 양 끝에 나타나게
    }

    .tasks-left {
        color: #20c997;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
    }

    .tasks-get {
        color: #ff6b6b;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
    }

    .click-routine {
        color: #feda00;
        font-size: 23px;
        margin-top: 0%;
        margin-left: 6px;
        font-weight: bold;
        -webkit-text-stroke: 0.3px #787878;
        cursor: pointer;
    }
`;

function TodoHead() {
  // 현재 todos 가져오기
  const todos = useTodoState();
  // todo 항목들 중에서 done 값이 false 인 것만 가져오기
  const undoneTasks = todos.filter(todo => !todo.done);
  // todo 항목들 중에서 emoji 값이 true 인 것만 가져오기
  const emojiTasks = todos.filter(todo => todo.emoji);

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

  const [routine, setRoutine] = useState(false); // 상태관리, 기본값 false
  const onRoutine = () => setRoutine(!routine); // routine 기존값 반전
  // 요일 옆 별 클릭하면 즐겨찾기 창 켜지게 (true)

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className='dayroutine'>
        <div className="day">{dayName}</div>
        <div>
          <div className="click-routine" onClick={onRoutine}>★</div>
          {routine && 
            <RoutineTemplate setRoutine={setRoutine}>
              {/* RoutineTemplate컴포넌트 내부에서 X클릭 시(closeRoutine),
              setRoutine을 props로 전달한다.*/}
              <RoutineHead />
              <RoutineList />
            </RoutineTemplate> 
          }
        </div>
      </div>
      <div className="tasks">
        <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
        <div className="tasks-get">❤ {emojiTasks.length}</div>
      </div>
      
    </TodoHeadBlock>
  )
}

export default TodoHead;