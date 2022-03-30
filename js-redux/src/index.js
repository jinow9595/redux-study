import { createStore } from "redux";

const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const data = document.querySelector("#data");

const PLUS = "plus";
const MINUS = "minus";

const reducer = (state = 0, action) => {
    switch (action.type) {
        case PLUS:
            return state += 1;
        case MINUS:
            return state -= 1;
        default:
            return state;
    }
};

const store = createStore(reducer);

store.subscribe(() => data.innerText = store.getState());

plus.addEventListener("click", () => store.dispatch({ type: PLUS }));
minus.addEventListener("click", () => store.dispatch({ type: MINUS }));

// let count = 0;
// updateText();

// function updateText() {
//     data.innerText = count;
// };

// plus.addEventListener("click", () => {
//     count += 1;
//     updateText();
// });

// minus.addEventListener("click", () => {
//     count -= 1;
//     updateText();
// });


const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = text => {
    return {
        type: ADD_TODO,
        text
    };
};

const deleteToDo = id => {
    return {
        type: DELETE_TODO,
        id
    };
};

const reducer2 = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            const newToDoObj = { text: action.text, id: Date.now() };
            return [newToDoObj, ...state];
        case DELETE_TODO:
            const cleaned = state.filter(toDo => toDo.id !== action.id);
            return cleaned;
        default:
            return state;
    }
};

const store2 = createStore(reducer2);

store2.subscribe(() => console.log(store2.getState()));

const dispatchAddToDo = text => {
    store2.dispatch(addToDo(text));
};

const dispatchDeleteToDo = e => {
    const id = parseInt(e.target.parentNode.id);
    store2.dispatch(deleteToDo(id));
};

const paintToDos = () => {
    const toDos = store2.getState();
    ul.innerHTML = "";
    toDos.forEach(toDo => {
        const li = document.createElement("li");
        const btn = document.createElement("button");

        btn.innerText = "del";
        btn.style.marginLeft = "10px";
        btn.addEventListener("click", dispatchDeleteToDo);

        li.id = toDo.id;
        li.innerText = toDo.text;

        li.appendChild(btn);
        ul.appendChild(li);
    });
};

store2.subscribe(paintToDos);
const onSubmit = e => {
    e.preventDefault();

    const toDo = input.value;
    input.value = "";

    dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);