// 중앙에 정렬된 흰색 박스를 보여주기

import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

//스타일링
const RoutineTemplateBlock = styled.div`
  width: 300px;
  height: 500px;

  /* 최상단 위치 */
  z-index: 999;

  position: absolute;
  background: white;
  border-radius: 16px; /* 테두리 둥글게 */
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2); /* rgba: 투명도 설정 */

  left: 30%;

  margin-top: -20px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column; /* 위에서 아래 방향(컬럼 방향) 설정 */
`;

const Close = styled.div`
  margin-left: auto;
  margin-right: 10px;
  margin-top: 10px;
  color: #20c997;
  &:hover{
    cursor: pointer;
  }
`;

// props로 children 받아와서 향후 재사용 가능성을 열어둔다.
function RoutineTemplate({ children, setRoutine }) {
  const closeRoutine = () => setRoutine(false); 
  //setRoutine 을 false로 바꿔주면서 창 닫히게
  
  return (
    <RoutineTemplateBlock>
      <Close onClick={closeRoutine}>
        <AiOutlineClose/>
      </Close>
      {children}
    </RoutineTemplateBlock>
  );
}

export default RoutineTemplate;