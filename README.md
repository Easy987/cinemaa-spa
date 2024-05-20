# Cinemaa SPA

Cinemaa SPA is a Vue.js-based Single Page Application for the Cinemaa online movie platform. It integrates seamlessly with the Cinemaa API to provide users with a rich, interactive experience for watching movies, commenting, rating, chatting, and participating in forums. The application uses Vuex for state management.

## Features

- **User Registration and Authentication**
  - Register new users
  - User login and logout
  - Password reset

- **Movie Management**
  - Watch movies
  - Submit movie links for moderation
  - Rate and comment on movies

- **Forum**
  - Create and participate in discussions
  - Comment on forum threads

- **Chat**
  - Real-time chat functionality

- **Admin Panel**
  - Manage users
  - Approve or deny submitted movie links
  - Moderate forum activities

## Technologies Used

- **Frontend Framework:** Vue.js
- **State Management:** Vuex
- **Routing:** Vue Router
- **HTTP Client:** Axios
- **Real-time Communication:** Pusher, Vue Echo
- **Styling:** Bootstrap
- **Build Tool:** Webpack

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Easy987/cinemaa-spa.git
    cd cinemaa-spa
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Environment Setup:**

    Copy the `.env.example` file to `.env` and update the necessary environment variables, especially the API endpoint.

    ```bash
    cp .env.example .env
    ```

4. **Run the application:**

    ```bash
    npm run serve
    ```
