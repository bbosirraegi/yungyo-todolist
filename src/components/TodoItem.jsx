import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  cursor: pointer;
  position: relative;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

const Editdiv = styled.form`
  position: absolute;
  margin-left: 50px;
  margin-top: 2px;
  width: 70%;
`;

const Edit = styled.input`
  padding: 3px;
  border-radius: 5px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box; //패딩이 삐져나오지 않게
`;


function TodoItem({ id, done, text }) {
  const dispatch = useTodoDispatch();
  const onToggle = () => dispatch({ type: 'TOGGLE', id }); //껐다켰다
  const onRemove = () => dispatch({ type: 'REMOVE', id });
  // id : props 받은 것 넣어준다.

  const [edit, setEdit] = useState(false); // 상태관리, 기본값 false
  const onEdit = () => setEdit(!edit); // edit 기존값 반전

  const [value,setValue] = useState(text); 
  //useState(text) 설정해주면 input에서 바로 수정 가능해진다.
  const onChange = (e) => setValue(e.target.value);
  //e(이벤트) 받아와서 input 상태 관리

  const onSubmit = (e) => { 
    e.preventDefault(); // 새로고침 방지
    // onSubmit 이벤트 발생했을 때 dispatch
    dispatch({
      type: 'EDIT',
      todo: {
        id,
        text: value
      }
    });
    setValue(value); //수정된 값으로
    onEdit(false); //닫아줘야하므로
  };


  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>{done && <MdDone />}</CheckCircle>
      <Text done={done} onClick={onEdit}>
        {value}
        {/* text에서 value로 바꿔줘야한다. 값이 변경되기 때문.?? */}
      </Text>
      {edit && (<Editdiv onSubmit={onSubmit}>
        <Edit onClick={onEdit} 
          autoFocus placeholder={text}
          //여기는 text를 해줘도 된다. 값이 변경됐기 때문.
          onChange={onChange}
          value={value}
        >
        </Edit>
      </Editdiv>)}
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

// export default TodoItem;
// React.memo 사용하면 최적화
// 디스패치(dispatch)만 가져오고 있기 때문에 다른 항목 업데이트 시 리렌더링 방지
  // 예를 들어 하나의 일정 체크 해지(onToggle)했을 때, 다른 것들 리렌더링 안된다.
export default React.memo(TodoItem);