# WIMan

[![codecov](https://codecov.io/gh/TheNumbered/wiman/branch/master/graph/badge.svg?token=FCO8UJYASN)](https://codecov.io/gh/TheNumbered/wiman)

The Classroom/Venue Management App simplifies classroom and venue assignments, bookings, and maintenance on campus. It integrates with academic calendars, offers a room booking system, and includes a maintenance issue reporting tool. Users can view availability via a visual calendar and receive notifications for bookings and updates. The app features a user-friendly dashboard, an admin interface for managing schedules and maintenance, and APIs for bookings, schedules, maintenance, notifications, and user management. The infrastructure ensures secure, scalable, and efficient space utilization on campus.

<br/>

## Code Coverage Graph

<img src="https://codecov.io/gh/TheNumbered/wiman/graphs/icicle.svg?token=FCO8UJYASN"/>

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
- `VITE_CLERK_PUBLISHABLE_KEY`: The publishable key provided by (https://clerk.com/)

### Backend Environment Variables

- `MYSQL_DATABASE`: The name of the MySQL database.
- `MYSQL_HOST`: The host of the MySQL database.
- `MYSQL_PASSWORD`: The password for the MySQL database.
- `MYSQL_PORT`: The port of the MySQL database.
- `MYSQL_USER`: The username for the MySQL database.
- `CLERK_PUBLISHABLE_KEY`: The publishable key provided by (https://clerk.com/)
- `CLERK_SECRET_KEY` : The secret key provided by (https://clerk.com/)
- `API_KEY`: This the secret key (used by other apps)
- `ONESIGNAL_REST_API_KEY`: <Your OneSignal REST API Key> from (https://onesignal.com/)
- `ONESIGNAL_USER_AUTH_KEY`: <Your OneSignal User Auth Key>
- `AZURE_BLOB_CONTAINER_NAME`: <Your Azure Blob Container Name>
- `AZURE_STORAGE_CONNECTION_STRING`: <Your Azure Storage Connection String>

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

- Karabo Joshua Mofamere,
- Daniel Ngobe,
- Theophilus Kgopa,
- Sisekelo Ngcobo,
- Kharendwe Negota,
- Aphile Bulube
