import { useEffect, useState } from 'react'
import './App.css'
import chain_SC from './chains/Software company'

const chain = chain_SC('写一个命令行版本的学生成绩管理系统')

function App() {
    const [running, setrunning] = useState(false)
    const [msglist, setmsglist] = useState([])
    const [players, setplayers] = useState({})
    useEffect(() => {
        setplayers(chain.members)
    }, [])
    return (
        <div className="App">
            <div className="left">
                {msglist.map(item => {
                    return (
                        <div className="msg">
                            <div className="name">{item.speaker}</div>
                            <div className="content">{item.content}</div>
                        </div>
                    )
                })}
            </div>
            <div className="right">
                <div className="map">
                    {Object.keys(players).map((name, index) => {
                        return msglist.length && name === msglist[msglist.length - 1].speaker ? (
                            <div className="empty" style={{ left: index * 100 + 20 + 'px' }}></div>
                        ) : (
                            <div className="player" style={{ left: index * 100 + 20 + 'px' }}>
                                {name}
                            </div>
                        )
                    })}
                    {msglist.length && (
                        <div className="speaker" style={{ left: Object.keys(players).findIndex(name => name === msglist[msglist.length - 1].listener) * 100 + 20 + 'px' }}>
                            {msglist[msglist.length - 1].speaker}
                        </div>
                    )}
                </div>
                <button onClick={reset}>reset</button>
                <button onClick={step} disabled={running}>
                    step
                </button>
            </div>
        </div>
    )
    function reset() {
        chain.reset()
        setmsglist([])
    }
    async function step() {
        setrunning(true)
        let msg = await chain.step()
        setmsglist([...msglist, msg])
        setrunning(false)
    }
}

export default App
