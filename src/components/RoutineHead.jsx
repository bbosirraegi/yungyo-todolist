import React from 'react';
import styled from 'styled-components';
import RoutineList from './RoutineList';

const RoutineHeadBlock = styled.div`
    // 현재 날짜, 요일, 몇 개 항목이 안끝났는지 알려줄 거다
    display: flex;
    padding-top: 12px;
    padding-bottom: 24px;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e9ecef;

    // scss 문법
    h2 {
        margin: 0; 
        font-size: 21px;
        color: #343a40;
    }
    
`;

function RoutineHead() {

  return (
    <RoutineHeadBlock>
        <h2>즐겨찾기</h2>
    </RoutineHeadBlock>
  )
}

export default RoutineHead;