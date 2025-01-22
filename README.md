# AI Mental Health Assistant

## Description

This project is an AI mental health assistant that uses GPT-4 to generate responses to user messages. It is built using Node.js, Express, Python, and the OpenAI API.

## Installation

1. Clone the repository (https://github.com/danielozeh/ai-mental-health-assistant)
2. Run `npm install` in the `apis` directory
3. Run `pip install -r ai/requirements.txt` in the `ai` directory
4. Create a `.env` file in the `apis` directory with the following variables:
    - `OPENAI_API_KEY`: Your OpenAI API key
    - `JWT_SECRET`: A secret key for JWT

## Usage

1. Run `npm start` in the `apis` directory
2. Run `python ai_trainer.py` in the `ai` directory
3. Send a POST request to `http://localhost:3000/api/chat` with the following JSON body:
    - `userMessage`: The message to send to the AI
4. The AI will respond with a message

## Notes

- This is a mock implementation and does not use the OpenAI API.
- The AI is not fine-tuned and does not have any knowledge of mental health.
- This is a proof of concept and is not meant to be used in production.

## Future Work

- Fine-tune the AI model with a mental health dataset
- Customizable AI Therapist Characters: Offers options like empathetic, analytical, or motivational personalities.
- Customizable AI Therapist Settings: Allows users to set the AI's tone, language, and other parameters.
- Add guardrails to the AI model
- Add a frontend to the application
- Add authentication and authorization to the application
- Add a chat history to the application

## License

This project is licensed under the MIT License - see the LICENSE file for details.
