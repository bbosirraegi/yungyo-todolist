import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from '../TodoContext';


const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px; /*아이콘 크기*/
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%); /* 더 정확한 버튼 위치 찾아가기 */
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in; // 애니메이션 나타나게. 0.125초
  // open 이라는 값 있으면 다른 스타일 보여주기
  // open 이 true 일 때,
  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
      // 45도 돌려주기
    `}
`;

// 폼 위치 잡아주기
const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

// 폼 스타일
// styled.form `` 을 하게 되면, 글을 적고 엔터 쳤을 때 onSubmit 이 된다.
  // 그러면 새로고침이 된다.
const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

// 폼 내부에 글자 적는 공간 스타일
const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box; //패딩이 삐져나오지 않게
`;

function TodoCreate() {
  const [open, setOpen] = useState(false); // 기본값 false
  const [value, setValue] = useState(''); // 기본값 공백

  const onToggle = () => setOpen(!open); // open 기존값 반전
  const onChange = (e) => setValue(e.target.value); //e(이벤트) 받아와서 input 상태 관리
  
  const onSubmit = (e) => { 
    e.preventDefault();
    // onSubmit 이벤트 발생했을 때 dispatch
    dispatch({
      type: 'CREATE',
      todo: {
        id: nextId.current,
        text: value,
        done: false
      }
    });
    setValue('');
    setOpen(false); //닫아줘야하므로
    nextId.current += 1; //기존에 4였으니 5가 되겠다
  }; // 새로고침 방지

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input 
              autoFocus placeholder="할 일을 입력 후, Enter 를 누르세요"
              onChange={onChange}  
              value={value}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

// export default TodoCreate;
export default React.memo(TodoCreate);