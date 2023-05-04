import React from 'react';
import logo from '../logo.png';
import '../App.css';

function Author() {
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <body className="App-body">
                <form>
                    <p>
                        Username<br/>
                        <input type={"text"}/>
                    </p>
                    <p>
                        Password<br/>
                        <input type={"text"}/>
                    </p>
                    <p><input type={"submit"}/></p>
                </form>
            </body>
            <footer className="App-footer">

            </footer>
        </div>
    );
}

export default Author;