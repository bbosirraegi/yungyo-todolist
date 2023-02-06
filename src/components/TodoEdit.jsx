import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useTodoDispatch } from '../TodoContext';

const Editdiv = styled.div`
  position: absolute;
  margin-left: 50px;
  margin-top: 3px;
  width: 70%;
  /* background: gray; */
`

const Edit = styled.input`
  padding: 3px;
  border-radius: 5px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box; //패딩이 삐져나오지 않게
`

function TodoEdit({text}) {
    
    const [edit, setEdit] = useState(false); // 상태관리, 기본값 false
    const onEdit = () => setEdit(!edit); // edit 기존값 반전

    return (
        <Editdiv>
            <Edit onClick={onEdit} autoFocus placeholder={text}></Edit>
        </Editdiv>
    )
}

export default TodoEdit;