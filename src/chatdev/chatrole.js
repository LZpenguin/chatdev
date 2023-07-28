import { openai } from '../utils/openai'
import roles from './roles'

function ChatRole(name, role) {
    this.name = name + '(' + role + ')'
    this.role = role
    this.memory = []
}

ChatRole.prototype.listen = async function (speaker, content) {
    this.memory = this.memory.concat([{ speaker, content }])
}

ChatRole.prototype.speak = async function (listener, command) {
    let msgList = [{ role: 'system', content: roles[this.role] }]
    console.log(this.memory)
    let memory = this.memory
        .map(item => {
            if (item.speaker === this.name + '(' + this.role + ')') {
                return 'yourself(' + this.role + '): ' + item.content
            } else {
                return item.speaker + ': ' + item.content
            }
        })
        .join('\n')
    msgList.push({ role: 'user', content: "Here are some conversations you've had with others:\n" + memory })
    msgList.push({ role: 'user', content: command + '\nyour answer should be from a first-person perspective and not contain colons\nlimit your answer in 100 words' })
    let res = await openai.chatgpt(msgList)
    this.listen(this.name, res)
    listener && listener.listen(this.name, res)
    return res
}

export default ChatRole
