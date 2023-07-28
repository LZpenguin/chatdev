import { useEffect, useState } from 'react'
import './App.css'
import chain_SC from './chains/Software company'

const chain = chain_SC('写一个命令行版本的学生成绩管理系统')

function App() {
    const [msglist, setmsglist] = useState([
        {
            name: 'chatdev',
            content: '这是chatdev的对话列表'
        }
    ])
    useEffect(() => {}, [])
    return (
        <div className="App">
            <div className="left">
                {msglist.map(item => {
                    return (
                        <div className="msg">
                            <div className="name">{item.name}</div>
                            <div className="content">{item.content}</div>
                        </div>
                    )
                })}
            </div>
            <div className="right">
                <button onClick={start}>start</button>
                <button onClick={step}>step</button>
            </div>
        </div>
    )
    async function start() {
        await chain.start('po', '准备进行询问，思考一下策略')
        console.log(chain)
    }
    async function step() {
        let msg = await chain.step()
        setmsglist([...msglist, msg])
    }
}

export default App
