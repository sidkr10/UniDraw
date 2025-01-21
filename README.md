# Collaborative Whiteboard Application

Welcome to the Collaborative Whiteboard Application repository! This project is designed to facilitate real-time, interactive whiteboard sessions for multiple users, enabling enhanced team productivity and seamless remote collaboration.

## Features

- **Real-time Collaboration**: Multiple users can interact simultaneously on the whiteboard, making it perfect for brainstorming sessions, meetings, and collaborative projects.
- **Smooth Communication**: Leveraged Spring Boot Web Sockets and STOMPJS Protocol to ensure real-time message broadcasting, providing smooth and synchronized communication among users.
- **Efficient State Management**: Utilized React Redux Toolkit for efficient state management, ensuring the application remains responsive and dynamic.
- **Advanced Drawing Capabilities**: Integrated RoughJS library to allow users to create and manipulate visual elements easily, enhancing the drawing experience on the whiteboard.

## Tech Stack

- **Backend**: 
  - **Java (Spring Boot)**: For the server-side application, managing WebSocket connections, and handling real-time messaging.
- **Frontend**: 
  - **React**: For building the user interface.
  - **Redux Toolkit**: For state management.
  - **STOMPJS**: For handling subscription and publication to various message topics.
  - **RoughJS**: For providing advanced drawing capabilities on the whiteboard.
  - **Vite**: For fast and optimized frontend build.

## Getting Started

### Prerequisites

- Java 11 or higher
- Node.js and npm

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/sidkr10/UniDraw.git
    cd your-repo-name
    ```

2. **Backend Setup**:
    - Navigate to the backend directory and build the Spring Boot application:
      ```sh
      cd backend
      ./mvnw clean install
      ./mvnw spring-boot:run
      ```

3. **Frontend Setup**:
    - Navigate to the frontend directory, install dependencies, and start the React application using Vite:
      ```sh
      cd ../unidraw
      npm install
      npm run dev
      ```

### Usage

1. Open your browser and navigate to `http://localhost:5173` to access the application.
2. Create or join a session to start collaborating with other users in real-time.

## Acknowledgements

- Thanks to the developers of Spring Boot, React, Redux Toolkit, STOMPJS, RoughJS, and Vite for their fantastic libraries and tools.
