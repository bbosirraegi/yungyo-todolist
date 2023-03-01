// 중앙에 정렬된 흰색 박스를 보여주기

import styled from 'styled-components';

//스타일링
const TodoTemplateBlock = styled.div`
  width: 512px;
  height: 768px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px; /* 테두리 둥글게 */
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04); /* rgba: 투명도 설정 */

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column; /* 위에서 아래 방향(컬럼 방향) 설정 */
`;

function TodoTemplate({ children }) {
  return (
    <TodoTemplateBlock>{children}</TodoTemplateBlock>
  );
};

export default TodoTemplate;