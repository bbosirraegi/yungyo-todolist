import React, { useReducer, createContext, useContext, useRef } from "react";

// 기본 객체 만들어주기. 배열
const initialTodos = [
    { id: 1, text: "프로젝트 생성하기", done: true, emoji: false },
    { id: 2, text: "컴포넌트 스타일링 하기", done: true, emoji: false },
    { id: 3, text: "Context 만들기", done: false, emoji: true },
    { id: 4, text: "기능 구현하기", done: false, emoji: true }
];

// CREATE 생성
// EDIT 수정
// TOGGLE 체크 껐다 켰다
// Emoji 이모지 껐다 켰다
// REMOVE 지우기
// 네 가지 액션들에 대해서 상태 업데이트
function todoReducer(state, action) {
    switch (action.type) { // 만약 액션 타입이 ~ 이라면?
        case "CREATE":
            return state.concat(action.todo); 
            //액션 항목 안에 todo 넣어서 dispatch 해줄 것
            //state 배열에 action.todo 추가하여 리턴
        case "EDIT":
            return state.map((todo) =>
                todo.id === action.id ? {...todo, text: action.text } : todo
                // 만약 둘이 같다면 action이 정의한 내용으로 바꾼다.
            );
        case "EMOJI":
            return state.map((todo) =>
                todo.id === action.id ? { ...todo, emoji: !todo.emoji } : todo
                // 만약 둘이 같다면 emoji 값을 기존 값에서 반전시켜서 업데이트. 
            );
        case "TOGGLE":
            return state.map((todo) =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
                // 만약 둘이 같다면 done 값을 기존 값에서 반전시켜서 업데이트. 
            );
        case "REMOVE":
            return state.filter((todo) => todo.id !== action.id);
            // 모든 todo 항목들에 대하여 action id와 todo id 가 일치하지 않는 것만 가져오기
            // 그럼 일치하는 것들은 사라지게 된다 (일치하지 않는 것만 가져오니까)
        
        default: // 처리할 수 없는 액션 온다면 throw
            throw new Error(`Unhandled action type : ${action.type}`);
    }
}

//Context
const TodoStateContext = createContext(); // state 위한 context
const TodoDispatchContext = createContext(); // dispatch 위한 context
const TodoNextIdContext = createContext(); // nextid 위한 context


// 컴포넌트
export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    // todoReducer, 초기상태(initialTodos)

    const nextId = useRef(5); 
    // 현재 4개 들어있으니 그 다음인 5로 초기화

    return (
        // State와 Dispath 중 뭐를 바깥으로 해줘도 상관없다.
        // value 값 설정해줘야한다.
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}


// 3개의 커스텀 훅
// 이렇게 해놓으면 나중에 그냥 useTodoState 만 불러와서 쓰면 된다.
export function useTodoState() {
    // return useContext(TodoStateContext);
    // 에러처리
    const context = useContext(TodoStateContext);
    if (!context) {
      throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch() {
    // return useContext(TodoDispatchContext);
    const context = useContext(TodoDispatchContext);
    if (!context) {
      throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoNextId() {
    // return useContext(TodoNextIdContext);
    const context = useContext(TodoNextIdContext);
    if (!context) {
      throw new Error('Cannot find TodoProvider');
    }
    return context;
}