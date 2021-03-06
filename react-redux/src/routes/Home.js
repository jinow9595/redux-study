import { useState, useEffect } from 'react';

function Home() {
    const [text, setText] = useState("");

    function onChange(e) {
        setText(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        setText("");
    }

    return (
        <>
            <h1>Todo</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button>add </button>
            </form>
            <ul></ul>
        </>
    );
}

export default Home;