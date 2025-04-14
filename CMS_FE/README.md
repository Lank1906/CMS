# Contract Management System (CMS) - Frontend (ReactJS)

This repository contains the frontend implementation of the **Contract Management System (CMS)** built with ReactJS. The application provides a user-friendly interface for managing accounts, customers, projects, and contracts, with features like authentication, status tracking, and resource assignment.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
5. [Project Structure](#project-structure)
6. [Usage](#usage)
7. [Contributing](#contributing)

---

## Project Overview
The Contract Management System (CMS) is a web application designed to streamline the management of contracts, projects, customers, and accounts. This frontend, built with ReactJS, integrates with a backend API (to be implemented separately) to provide a seamless user experience.

---

## Features
- **Register**: Allow new users to sign up.
- **Login**: Authenticate users to access the system.
- **Account Creation**: Create and manage user accounts.
- **Customer Information Management**: Add and update customer details.
- **Account Status Tracking**: Monitor account statuses.
- **Project Creation**: Create new projects.
- **Assign Customer Account**: Link customers to projects.
- **Project Status Management**: Track and update project statuses.
- **View Detail Account/Contract**: View detailed information about accounts and contracts.
- **Search & Filter Projects**: Search and filter projects based on criteria.
- **Contract Creation**: Create new contracts.
- **Resource Assignment**: Assign resources to contracts.
- **Contract Document Link**: Link documents to contracts.
- **Contract Status Management**: Monitor and update contract statuses.

---

## Technologies Used
- **ReactJS**: JavaScript library for building user interfaces.
- **react-router-dom**: For client-side routing.
- **Axios**: For making HTTP requests to a backend API.
- **react-icons**: For including icons in the UI.

---

## Setup Instructions
Follow these steps to set up and run the project locally.

1. **Create a new React app**:
   ```bash
   npx create-react-app contract-management-system
   cd contract-management-system
   ```

2. **Install dependencies**:
   ```bash
   npm install react-router-dom axios react-icons
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000` in your browser.

---

## Project Structure
Below is the directory structure of the `contract-management-system` project:

```
contract-management-system/
├── package.json
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── assets/
│       └── images/
├── src/
│   ├── index.js              # Entry point của ứng dụng
│   ├── App.js               # Component chính, chứa Router
│   ├── assets/              # Tài nguyên tĩnh
│   │   ├── fonts/
│   │   ├── images/
│   │   └── styles/
│   │       ├── variables.css  # Biến CSS toàn cục
│   │       └── global.css     # Style toàn cục
│   ├── components/          # Các component tái sử dụng
│   │   ├── common/          # Component chung
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── auth/            # Component liên quan đến xác thực
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── account/         # Component liên quan đến tài khoản
│   │   │   ├── AccountForm.jsx
│   │   │   ├── AccountList.jsx
│   │   │   └── AccountDetails.jsx
│   │   ├── customer/        # Component liên quan đến khách hàng
│   │   │   ├── CustomerForm.jsx
│   │   │   ├── CustomerList.jsx
│   │   │   └── CustomerDetails.jsx
│   │   ├── project/         # Component liên quan đến dự án
│   │   │   ├── ProjectForm.jsx
│   │   │   ├── ProjectList.jsx
│   │   │   └── ProjectDetails.jsx
│   │   └── contract/        # Component liên quan đến hợp đồng
│   │       ├── ContractForm.jsx
│   │       ├── ContractList.jsx
│   │       └── ContractDetails.jsx
│   ├── layouts/             # Layout cho các trang
│   │   ├── MainLayout.jsx   # Layout chính cho các trang đã đăng nhập
│   │   └── AuthLayout.jsx   # Layout cho các trang xác thực
│   ├── pages/               # Các trang chính của ứng dụng
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── AccountsPage.jsx
│   │   ├── AccountDetailsPage.jsx
│   │   ├── CustomersPage.jsx
│   │   ├── CustomerDetailsPage.jsx
│   │   ├── ProjectsPage.jsx
│   │   ├── ProjectDetailsPage.jsx
│   │   ├── ContractsPage.jsx
│   │   └── ContractDetailsPage.jsx
│   ├── router/              # Cấu hình Router
│   │   └── AppRouter.jsx
│   ├── services/            # API services
│   │   ├── api.js           # Cấu hình Axios
│   │   ├── authService.js
│   │   ├── accountService.js
│   │   ├── customerService.js
│   │   ├── projectService.js
│   │   └── contractService.js
│   ├── utils/               # Hàm tiện ích
│   │   ├── constants.js     # Hằng số
│   │   ├── helpers.js       # Hàm hỗ trợ
│   │   └── validators.js    # Hàm kiểm tra dữ liệu
│   ├── hooks/               # Custom hooks
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   └── context/             # Context API
│       └── AuthContext.jsx  # Quản lý trạng thái xác thực
└── README.md
```

### Directory Explanation
- **`public/`**: Chứa các file tĩnh như `index.html` và tài nguyên hình ảnh.
- **`src/`**: Thư mục chính chứa mã nguồn.
  - **`assets/`**: Lưu trữ tài nguyên tĩnh như fonts, images, và CSS toàn cục.
  - **`components/`**: Các component tái sử dụng, chia theo module (common, auth, account, customer, project, contract).
  - **`layouts/`**: Các layout chính (MainLayout cho trang đã đăng nhập, AuthLayout cho trang đăng nhập/đăng ký).
  - **`pages/`**: Các trang chính tương ứng với từng chức năng.
  - **`router/`**: Cấu hình định tuyến với `react-router-dom`.
  - **`services/`**: Các hàm gọi API sử dụng Axios.
  - **`utils/`**: Hàm tiện ích và hằng số.
  - **`hooks/`**: Custom hooks để quản lý logic (xác thực, fetch dữ liệu).
  - **`context/`**: Context API để quản lý trạng thái toàn cục (như xác thực).

---

## Usage
- After starting the development server, open your browser and navigate to `http://localhost:3000`.
- Use the interface to:
  1. Register or log in to access the system.
  2. Create and manage accounts, customers, projects, and contracts.
  3. Track statuses and assign resources as needed.
- Note: This frontend requires a backend API to fully function (e.g., for authentication, data storage).

---

## Contributing
Contributions are welcome! To contribute:
1. Fork this repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m "Add your message"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

Happy coding!