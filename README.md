# Dara

**Description:** ALX final project 🔥

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Endpoints](#endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction
Dara is a project developed as part of the ALX program. It provides functionalities for file parsing, summary generation, and question generation from various document types.

## Features
- **File Parsing:** Supports `.pptx`, `.pdf`, `.docx`, and `.txt` file formats.
- **Summary Generation:** Generates summaries from the content of the supported document types.
- **Question Generation:** Generates questions from the content of the supported document types.

## Installation
To get started with Dara, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/oovaa/dara.git
   cd dara
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables.

## Usage
To use Dara, you can use the following commands:

- **Start the server:**
  ```bash
  npm start
  ```

### Endpoints
- **Generate Summary:**
  - **URL:** `/api/sum`
  - **Method:** `POST`
  - **Description:** Upload a file to generate a summary.
  - **Example:**
    ```bash
    curl -X POST -F 'file=@path/to/your/file.pdf' http://localhost:3000/api/sum
    ```

- **Generate Questions:**
  - **URL:** `/api/qs`
  - **Method:** `POST`
  - **Description:** Upload a file to generate questions.
  - **Example:**
    ```bash
    curl -X POST -F 'file=@path/to/your/file.pdf' http://localhost:3000/api/qs
    ```

## Project Structure
Here is a detailed description of the project structure:

```
.gitignore
bun.lockb
Dockerfile
index.js
LICENSE
package.json
README.md
server/
	controllers/
		generateQsController.js
		generateSummaryController.js
	middlewares/
		multerMiddleWare.js
		globalErrorHandler.js
	routes/
		generateQsRoute.js
		generateSummaryRoute.js
		index.js
	utils/
		ApiError.js
story.txt
test/
	chaint_test.js
tools/
	generateQs.js
	summarize.js
tsconfig.json
uploads/
	06bc5f0e-b218-45bb-8dea-0e7a9d908043-story.txt
	53db446f-3062-4541-aafe-66b8efe6a57e-story.txt
	574809b2-672c-45aa-a8ca-ad8bc8187d38-story.txt
	88cb0745-96a5-4f08-9ce5-da8c11c46be2-story.txt
	b318cee2-e5d2-4b97-9a72-28d8d101ecd5-story.txt
utils/
	model.js
	parser.js
```

### Root Files
- **.gitignore**: Specifies files and directories that should be ignored by Git.
- **bun.lockb**: Lock file for Bun package manager.
- **Dockerfile**: Contains instructions to build a Docker image for the project.
- **index.js**: Entry point of the application.
- **LICENSE**: License file for the project.
- **package.json**: Contains metadata about the project and its dependencies.
- **README.md**: This file, providing an overview of the project.

### Directories
- **server/**: Contains the server-side code.
  - **controllers/**: Contains controller files that handle requests and responses.
    - **[`generateQsController.js`](command:_github.copilot.openSymbolInFile?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fomar%2Frepos%2Fdara%2Fserver%2Fcontrollers%2FgenerateQsController.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22generateQsController.js%22%5D "/home/omar/repos/dara/server/controllers/generateQsController.js")**: Handles requests for generating questions.
    - **[`generateSummaryController.js`](command:_github.copilot.openSymbolInFile?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fomar%2Frepos%2Fdara%2Fserver%2Fcontrollers%2FgenerateSummaryController.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22generateSummaryController.js%22%5D "/home/omar/repos/dara/server/controllers/generateSummaryController.js")**: Handles requests for generating summaries.
  - **middlewares/**: Contains middleware functions.
    - **[`multerMiddleWare.js`](command:_github.copilot.openSymbolInFile?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fomar%2Frepos%2Fdara%2Fserver%2Fmiddlewares%2FmulterMiddleWare.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22multerMiddleWare.js%22%5D "/home/omar/repos/dara/server/middlewares/multerMiddleWare.js")**: Middleware for handling file uploads.
    - **[`globalErrorHandler.js`](command:_github.copilot.openSymbolInFile?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fomar%2Frepos%2Fdara%2Fserver%2Fmiddlewares%2FglobalErrorHandler.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22globalErrorHandler.js%22%5D "/home/omar/repos/dara/server/middlewares/globalErrorHandler.js")**: Middleware for handling global errors.
  - **routes/**: Contains route definitions.
    - **[`generateQsRoute.js`](command:_github.copilot.openSymbolInFile?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fomar%2Frepos%2Fdara%2Fserver%2Froutes%2FgenerateQsRoute.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22generateQsRoute.js%22%5D "/home/omar/repos/dara/server/routes/generateQsRoute.js")**: Route for generating questions.
    - **[`generateSummaryRoute.js`](command:_github.copilot.openSymbolInFile?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fomar%2Frepos%2Fdara%2Fserver%2Froutes%2FgenerateSummaryRoute.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22generateSummaryRoute.js%22%5D "/home/omar/repos/dara/server/routes/generateSummaryRoute.js")**: Route for generating summaries.
    - **[`index.js`](command:_github.copilot.openSymbolInFile?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fomar%2Frepos%2Fdara%2Fserver%2Froutes%2Findex.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22index.js%22%5D "/home/omar/repos/dara/server/routes/index.js")**: Main router that combines all routes.
  - **utils/**: Contains utility functions and classes.
    - **[`ApiError.js`](command:_github.copilot.openSymbolInFile?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fomar%2Frepos%2Fdara%2Fserver%2Futils%2FApiError.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22ApiError.js%22%5D "/home/omar/repos/dara/server/utils/ApiError.js")**: Custom error class for API errors.
- **story.txt**: Example text file used for testing.
- **test/**: Contains test files.
  - **[`chaint_test.js`](command:_github.copilot.openSymbolInFile?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fomar%2Frepos%2Fdara%2Ftest%2Fchaint_test.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22chaint_test.js%22%5D "/home/omar/repos/dara/test/chaint_test.js")**: Contains unit tests for the application.
- **tools/**: Contains scripts for generating summaries and questions.
  - **[`generateQs.js`](command:_github.copilot.openSymbolInFile?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fomar%2Frepos%2Fdara%2Ftools%2FgenerateQs.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22generateQs.js%22%5D "/home/omar/repos/dara/tools/generateQs.js")**: Script for generating questions from parsed documents.
  - **[`summarize.js`](command:_github.copilot.openSymbolInFile?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fomar%2Frepos%2Fdara%2Ftools%2Fsummarize.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22summarize.js%22%5D "/home/omar/repos/dara/tools/summarize.js")**: Script for generating summaries from parsed documents.
- **tsconfig.json**: Configuration file for TypeScript.
- **uploads/**: Directory for storing uploaded files.
- **utils/**: Contains utility functions and classes.
  - **[`model.js`](command:_github.copilot.openSymbolInFile?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fomar%2Frepos%2Fdara%2Futils%2Fmodel.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22model.js%22%5D "/home/omar/repos/dara/utils/model.js")**: Contains the model used for generating summaries and questions.
  - **[`parser.js`](command:_github.copilot.openSymbolInFile?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fomar%2Frepos%2Fdara%2Futils%2Fparser.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22parser.js%22%5D "/home/omar/repos/dara/utils/parser.js")**: Contains the parser for extracting text from documents.

## Contributing
Contributions are welcome! Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the GNU General Public License v3.0 - see the [`LICENSE`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fomar%2Frepos%2Fdara%2FLICENSE%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/omar/repos/dara/LICENSE") file for details.

