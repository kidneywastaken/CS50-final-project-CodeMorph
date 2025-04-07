# AI CODE TRANSFORMER

### Video Demo: https://youtu.be/s--nl4BfKq0

### Design Doc V1:

---

#### Problem:

In most, if not all, businesses there are systems that they use all the time to provide services to their customers, and these systems are very rarely all written in one language. The tech world is never standing still, all newer software is evolving all the time, changing to make the best possible solution for their end users. And businesses have to migrate their code to new versions if they want to use the new functionality of the version or migrate to new software. When they do this, they have to stop what they are doing, or most of what they are doing and this wastes time and resources better spent improving the business.

My project would be a solution to this problem that would utilise AI to optimise the time it takes to migrate systems.

#### Solution:

It would be a piece of software that allows the user to add a file, give a brief description of the file, and tell the AI what to do with it. The AI will make the change, run preset tests, and then output the result to the user where they can ask for a revision with a prompt for context for the revision.

#### Functionality:

1. The user will be prompted to input a file.

2. Auto-detect language and version (if possible, otherwise the user will input it).

> I now know that I don't need to know the version or the language; the AI can pick it up.

3. The user will give a description of what the file(s) do.

> I later realised this was unnecessary and took it out

4. The user will select Upgrade Version or Migrate Language.

5. The AI will look at deprecated APIs, removed classes or methods, new required configurations using language migration guides, and deprecation scanners.

6. The AI will run and rewrite all the code with the necessary changes.

7. Then automated tests will run to check for problems, and regression tests, then code quality checks and language-specific rule tests.

8. The results will be outputted to the user with the original and changed files compared visually. The user can then accept the changes or ask for a revision with a revision context prompt.

> I might add the revision functionally in the future.

9. When the user is satisfied, they can download the files and implement the changed files.

---

### Description:

#### File Structure:

- Code Transformer
  - .next
  - app
    - api
      - route.js
    - components
      - css
        styles.css
      - historyCard.js
      - codeDisplay.js
      - fileUploader.js
      - transformationForm.js
      - transformationType.js
    - globals.css
    - layout.js
    - page.js
  - .env
  - other config files...

#### route.js:

This file is one of the first I created when building this project. I wanted to complete all the logic and backend work before I started on any frontend.

This file creates a POST request to OpenAI with my prompt. I went with the gpt-4-mini model as it was much cheaper but still fast and could convert the code well. The response is then sent to the page file.

#### page.js:

This is the landing page and only page of this project. This page brings all the other components together, and when all the info has been inputted by the user, it creates the prompt which looks something like this:

> I want you to change the language of this file to python, here is the contents of the file: (file contents). When you have chanage the code i want you to run a few tests to make sure that the code run smoothly and without any errors. And if it does have any errors i wan you to update the code removing all the errors. I also want you to check the code quality and check for language specific rules changing anything to match these. IMPORTANT: Respond ONLY with the transformed code. Do not include ANY explanations, comments about what you changed, or markdown formatting. Your entire response should be valid code that can be executed directly.

When a response is received from the AI, it is put into a variable and sent off to another file to be displayed.

#### transformationForm.js

This file has the main form you see on the page that asks the user for all the info, like the file, update version, or change language, which version or language depending on the first choice, and then it has the submit button to send this data onto the AI eventually.

It sends half of the form over to page.js right when the user has selected a file, this lets the user preview the file and make sure this is the right one they want to change. Then it sends the other half when the submit button is pressed.

#### fileUploader.js

The only function of this file is to allow the user to upload a file. It is rendered dynamically so that before uploading a file, it displays the file uploader visually and prompts the user to upload. And after uploading a file, it displays the file name and file size. The data is then sent up to the trandformationForm.js file.

#### transformationType.js

This file handles the users choices. Originally I had all the input boxes visible at all times, but I decided to change it, making only three of four inputs visible at a time, simpler for the user. Allows the user to choose if they want to update the version or change the language of the uploaded file. And then what language or version to change it to. The data is then sent up to the trandformationForm.js file.

#### codeDisplay.js

This file receives the AI response and user inputted file from page.js. The user file is displayed as a preview before the file is submitted to the AI to be transformed. After receiving a response from the AI, it swaps over to the Diff View and displays the original file and the new transformed file side by side. There is also a download button that will download the newly transformed file. Both the type and file extension of the downloaded file are correct, so if you convert it to a C++ file, it will have a .cpp extension.

#### historyCard.js

At the end of this process, the data is stored in an array and displayed on the right of the page in the history column, which shows the original file name, the date and time of the transformation, and the language or version it was converted to.
