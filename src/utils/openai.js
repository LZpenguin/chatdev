import axios from 'axios'
const apikey = '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'

const chatgpt = messages => {
    return axios
        .post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages,
                temperature: 0.8
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + apikey
                }
            }
        )
        .then(res => {
            return res.data.choices[0].message.content
        })
}

export const openai = {
    chatgpt
}
