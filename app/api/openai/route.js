import { OpenAI } from 'openai';

// ChatGPT API call
export async function POST(request) {
    const { prompt } = await request.json();
    const openai = new OpenAI();
    
    try {
        // Create chat ChatGPT 
        const response = await openai.responses.create({
            model: "gpt-4o-mini",
            input: [
                {
                    role: "system", 
                    content: "Use your ability to analyze files that contain code uploaded by the user, and assist the user with their prompt."
                }, 
                {
                    role: "user", 
                    content:  prompt,
                }, 
            ], 
        });
        console.log("ChatGPT response: ", response.output_text); 
        return new Response(JSON.stringify({ response: response.output_text }));
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }))
    }
}