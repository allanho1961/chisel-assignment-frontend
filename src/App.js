import React, { useState, useEffect } from 'react';
import './App.css';
import pageComponents from './pageComponents/index';
import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:3001`
});

const App = (() => {
    const [cachedKey, setCachedKey] = useState({ key: "", value: "" });
    const [cachedOutput, setCachedOutput] = useState( '' );
    const [maxSize, setMaxSize] = useState( null );

    useEffect(() => {
        getMaxSize();
        getCachedKeys();
    },[]);

    const getMaxSize = async () => {
        await api.get('/max')
            .then(({data}) => {
            setMaxSize(data);
        });
    }

    const getCachedKeys = async () => {
        // Get the cached record based on the input of the key value entered
        if (cachedKey.key.length > 0) {
            await api.get(`/key/${cachedKey.key}`)
                .then(({data}) => {
                    console.log(JSON.stringify(data));
                });
        } else {
            // Fetch all of the keys
            await api.get('/keys')
                .then(({data}) => {
                    if (data.length > 0) {
                        setCachedOutput(JSON.stringify(data));
                    } else {
                        setCachedOutput("Empty");
                    }

                });
        }
    }

    const createCachedKey = async () => {
        if (cachedKey.key.length > 0) {
            await api.put(`/key`, { key: `${cachedKey.key}`, value: `${cachedKey.value}` })
                .then((response) => {
                    getCachedKeys();
                })
                .catch ((err) => {
                    console.log(err);
                });
        }
    }

    const resetCachedKeys = async () => {
        await api.post('/keys/reset')
            .then((response) => {
                getCachedKeys();
            })
            .catch( (err) => {
                console.log(err);
            });
    }

    return (
        <div className="ui container" style={{ marginTop: '25px' }}>
            <pageComponents.Header className="App-header" title="Chisel AI Engineering Assignment"/>
            <form className="ui form">
                <div className="field">
                    <br/>
                    <label>Enter Key</label>
                    <input
                        type="text"
                        value={cachedKey.key}
                        onChange={event => {
                            setCachedKey({ ...cachedKey, key: event.target.value} );
                        }}
                    />
                    <br/>
                    <label>Enter Value</label>
                    <input
                        type="text"
                        value={cachedKey.value}
                        onChange={event => {
                            setCachedKey({ ...cachedKey, value: event.target.value});
                        }}
                    />
                </div>
                <button onClick={getCachedKeys}>Get Key Value</button>&nbsp;
                <button onClick={createCachedKey}>Create New Key Value Pair</button>&nbsp;
                <button onClick={createCachedKey}>Update Existing Key Value</button>&nbsp;
                <button onClick={resetCachedKeys}>Reset All Key Values</button>&nbsp;
                <div className="field">
                    <label><br/>Max Cache Size:</label>
                    <input type="text" readOnly value={maxSize} style={{width: "100px"}}/>
                </div>
                <h3>
                <div className="ui label" style={{fontSize: '18px'}}>Here is the current list of nodes in LRU order:</div>
                <textarea className="ui container" name="textarea" value={cachedOutput}></textarea>
                </h3>
            </form>
        </div>
    );
});

export default App;
