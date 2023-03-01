import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useTodoDispatch, useTodoNextId } from '../TodoContext';
import { MdDelete } from 'react-icons/md';


const RoutineItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const Plus = styled.div`
  font-size: 24px;
  /* display: flex; */
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: #38d9a9;
  cursor: pointer;
`;

const Text = styled.div`
  flex: 1;
  font-size: 18px;
  color: #495057;
  cursor: pointer;
  position: relative;
`;

const Remove = styled.div`
  /* display: flex; */
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
`;





function RoutineItem({ todo }) {
    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    const onRoutineAdd = () => {
        dispatch({
            type: 'CREATE_ROUTINE',
            todo: {
                id: nextId.current,
                text: todo.text,
                done: false,
                emoji: false
            }
    });
        nextId.current += 1; //하나 늘어난다.
    };

    const onRoutineRemove = () => dispatch({ type: 'REMOVE_ROUTINE', id: todo.id }); //삭제


    return (
    <RoutineItemBlock>
        <Plus onClick={onRoutineAdd}>+</Plus>
        <Text>{todo.text}</Text>
        <Remove onClick={onRoutineRemove}>
            <MdDelete />
        </Remove>
    </RoutineItemBlock>
    );
}

export default RoutineItem;
// React.memo 사용하면 최적화
// export default React.memo(RoutineItem);