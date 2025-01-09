
# KYC Management System

## Overview
This project is designed to streamline the Know Your Customer (KYC) process. It includes both client and server components to manage user verification and compliance with regulatory requirements. The system features an admin panel and a user interface where users can add KYC requests and view the status of their requests. Admins can verify requests and update their status to either approved or rejected. The project uses MongoDB with Mongoose ORM and Cloudinary for cloud storage to upload documents. The p...

## Setup Instructions

### Frontend (Client)

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` directory based on the `.env.sample` file provided in the same directory.

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

5. Access the frontend locally at: [http://localhost:3000](http://localhost:3000)

### Backend (Server)

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory based on the `.env.sample` file provided in the same directory.

4. Start the backend server:
   ```bash
   npm run dev
   ```

5. Access the application locally at: [http://localhost:5173](http://localhost:5173)

## Usage

### User

1. Register an account or log in if you already have one.
2. After login, you will be directed to the "Home" page.
3. Use the "Add New KYC Request" button to submit a new KYC request by uploading the required documents.
4. Check the status of your KYC request on the "Home" page.

### Admin

1. Log in with your admin credentials.
2. After login, you will be directed to the "Dashboard" page.
3. To review KYC requests, navigate to the "Requests" page.
4. Verify the documents and update the status to either approved or rejected.
5. The dashboard includes a KPI section summarizing:
   - Total users.
   - Approved, rejected, and pending KYCs.

## Assumptions and Trade-offs

- The project assumes that users will have valid documents for KYC verification.
- Cloudinary is used for document storage due to its ease of integration and scalability.
- MongoDB is chosen for its flexibility in handling unstructured data.
- The project is deployed on Render for simplicity and ease of deployment.

## Additional Information

### User Interface

- After login, users are redirected to the "Home" page.
- The "Home" page lists all submitted KYC requests and their statuses.
- There is an "Add New KYC Request" button that opens a modal for submitting a new request.
- Users can submit their name, email address, document ID, file, and document type.

### Admin Dashboard

- The admin dashboard consists of two pages: Dashboard and Requests.
- The Dashboard page includes a KPI section summarizing:
  - Total users.
  - Approved, rejected, and pending KYCs.
- The Requests page allows admins to review and update the status of KYC requests.

## Conclusion

This project provides a comprehensive solution for managing KYC processes, with a user-friendly interface for users and a robust admin panel for managing requests. The use of MongoDB, Mongoose ORM, and Cloudinary ensures scalability and ease of document management.