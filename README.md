
```markdown
# Dara

**Description:** ALX final project 🔥

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
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
  - **URL:** `/generate-summary`
  - **Method:** `POST`
  - **Description:** Upload a file to generate a summary.
  - **Example:**
    ```bash
    curl -X POST -F 'file=@path/to/your/file.pdf' http://localhost:3000/generate-summary
    ```

- **Generate Questions:**
  - **URL:** `/generate-questions`
  - **Method:** `POST`
  - **Description:** Upload a file to generate questions.
  - **Example:**
    ```bash
    curl -X POST -F 'file=@path/to/your/file.pdf' http://localhost:3000/generate-questions
    ```

## Contributing
Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
```