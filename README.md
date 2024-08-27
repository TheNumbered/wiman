# WIMan

The Classroom/Venue Management App simplifies classroom and venue assignments, bookings, and maintenance on campus. It integrates with academic calendars, offers a room booking system, and includes a maintenance issue reporting tool. Users can view availability via a visual calendar and receive notifications for bookings and updates. The app features a user-friendly dashboard, an admin interface for managing schedules and maintenance, and APIs for bookings, schedules, maintenance, notifications, and user management. The infrastructure ensures secure, scalable, and efficient space utilization on campus.

## Getting Started

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [PNPM](https://pnpm.io/)

### Installation

1. Clone the repository.

   ```shell
   git clone https://github.com/TheNumbered/wiman.git
   ```

2. Navigate to the project directory.

   ```shell
   cd wiman
   ```

3. Install the dependencies for each module.
   ```shell
   pnpm  install
   ```

## Configure App

To configure the app, you need to set the following environment variables:

### Frontend Environment Variables

- `VITE_API_URL`: The API URL for the backend server.

### Backend Environment Variables

- `MYSQL_DATABASE`: The name of the MySQL database.
- `MYSQL_HOST`: The host of the MySQL database.
- `MYSQL_PASSWORD`: The password for the MySQL database.
- `MYSQL_PORT`: The port of the MySQL database.
- `MYSQL_USER`: The username for the MySQL database.

Make sure to set these environment variables before running the app.

## Usage

- To start the backend server, run the following command:

  ```shell
  pnpm backend
  ```

- To start the frontend development server, run the following command:
  ```shell
  pnpm frontend
  ```

# Acknowledgments

This project was developed as part of the Software Design course at Wits University by the following team:

Daniel Ngobe,
Karabo Joshua,
Kharendwe Negota,
Theophilus Kgopa,
Sisekelo Ngcobo,
Aphile Bulube
