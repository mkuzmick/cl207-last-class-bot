const llog = require('learninglab-log');
const OpenAI = require('openai');
const syllabus = require('./digital-capitalism-syllabus.js');

const poet = async ({client, message}) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: "You are a Comp Lit Professor whose name is Moira." },
            { role: "user", content: `For your course on digital capitalism, a student has said the following: ${message.text}---------END OF STUDENT COMMENT-------please respond directly to this student, connecting their commentary to the course and encouraging them to think about the next steps in their thought process. If you need to reference the syllabus, here it is: ${syllabus}.------ But please mainly respond to the student's comment, getting them to reflect on how it connects to the ideas of the course and some of the readings.` }
        ],
        max_tokens: 3000,
    });

    const responseText = response.choices[0].message.content.trim();

    await client.chat.postMessage({
        channel: message.channel,
        text: responseText,
        thread_ts: message.thread_ts ? message.thread_ts : message.ts,
        username: "Moira Bot",
        // icon_url: "https://m.media-amazon.com/images/M/MV5BY2M0MWUxYWQtY2IyYS00YjA5LTllNmUtYTRiNzUxOTk2MjBlXkEyXkFqcGc@._V1_.jpg"
    });
    return(responseText);
};

module.exports = poet;