function ChatChain() {
    this.members = {}
    this.chain = []
    this.stepIndex = 0
}

ChatChain.prototype.addMember = function (bot) {
    if (this.members[bot.name]) {
        throw new Error('member name repeat')
    }
    this.members[bot.name] = bot
}

ChatChain.prototype.removeMember = function (name) {
    if (this.members[name]) {
        throw new Error('member do not exist')
    }
    delete this.members[name]
}

ChatChain.prototype.addStep = function (instructor, assistant, command) {
    this.chain.push({
        instructor_name: instructor ? instructor.name : '',
        assistant_name: assistant ? assistant.name : '',
        command
    })
}

ChatChain.prototype.step = async function () {
    if (this.stepIndex > this.chain.length - 1) {
        return null
    }
    let stepInfo = this.chain[this.stepIndex]
    if (stepInfo.command.startsWith('goto')) {
        let targetIndex = parseInt(stepInfo.command.slice(4).trim())
        this.stepIndex = targetIndex
        return this.step()
    } else {
        let instructor = this.members[stepInfo.instructor_name]
        let assistant = this.members[stepInfo.assistant_name]
        let res = await instructor.speak(assistant, stepInfo.command)
        this.stepIndex++
        return {
            name: stepInfo.instructor_name,
            content: res
        }
    }
}

ChatChain.prototype.start = async function (assistant_name, command) {
    let assistant = this.members[assistant_name]
    await assistant.speak(null, command)
}

export default ChatChain
