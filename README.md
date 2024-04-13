
# CMPE280 Hackathon
**Hackathon - State of Food Security and Nutrition in the World 2023**

## Setup Instructions

Follow these steps to set up the project environment and start the application:

1. **Navigate to the Project Directory**
   ```bash
   cd Hackathon\ Code
   ```

2. **Create the Environment Variables File**
   Create a `.env` file in the project directory:
   ```bash
   touch .env
   ```
   Open the `.env` file and add the following line:
   ```
   CHATGPT_API_KEY=$YOUR_OPENAI_API_KEY
   ```

3. **Install Dependencies**
   Install the necessary node modules:
   ```bash
   npm install
   ```

4. **Start the Application**
   Launch the application with:
   ```bash
   npm start
   ```

5. **Open the Login Page**
   Open the file `templates/Login.html` in your web browser to view the login page.

## Additional Information

- Ensure you replace `$YOUR_OPENAI_API_KEY` with your actual OpenAI API key in the `.env` file.
- If you encounter any issues during the setup, check that your Node.js environment is correctly configured and up-to-date.
