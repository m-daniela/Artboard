import React from 'react';
import './main.scss';
import Board from './components/Board';
import BoardProvider from './components/helpers/Context';
import Side from './components/Side';

function App() {
    return (
        <div className="App">
            <BoardProvider>
                <Board />
                <Side />
            </BoardProvider>
        </div>
    );
}

export default App;
