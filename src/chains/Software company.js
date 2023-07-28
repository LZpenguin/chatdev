import ChatDev from '../chatdev'

const { ChatChain, ChatRole } = ChatDev

function chain_SC(requirement) {
    const chain = new ChatChain()
    const client = new ChatRole('yui', 'client')
    const CTO = new ChatRole('jack', 'CTO')
    const coder = new ChatRole('mike', 'coder')
    const tester = new ChatRole('horo', 'tester')
    // 添加成员
    chain.addMember(client)
    chain.addMember(CTO)
    chain.addMember(coder)
    chain.addMember(tester)
    // 添加步骤
    CTO.listen(client.name, requirement)
    chain.addStep(CTO, coder, "Break down the client's requirements and list the functional requirements of the program in detail")
    chain.addStep(coder, tester, 'Write or modify the code as required, return only the full code, and remember to write comments')
    chain.addStep(CTO, tester, 'Repeat the requirements you just split')
    chain.addStep(tester, CTO, 'According to the requirements told by the CTO, check the code sent to you by the coder and report the problems of the code in sections')
    chain.addStep(CTO, coder, 'Generate code change suggestions based on tester feedback')
    chain.addStep(coder, tester, 'Write or modify the code as required, return only the full code, and remember to write comments')
    chain.addStep(CTO, tester, 'Repeat the requirements you just split')
    chain.addStep(tester, CTO, 'According to the requirements told by the CTO, check the code sent to you by the coder and report the problems of the code in sections')
    chain.addStep(null, null, 'goto 4')

    return chain
}

export default chain_SC
