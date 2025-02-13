# Car Inventory Frontend

This is the frontend for the Car Inventory system, built with Vue.js.

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (16+ recommended)
- npm or yarn
- (Optional) Herd for backend development

### Installation
Clone the repository and install dependencies:
```sh
npm install
```

### Running the Development Server

#### If Using Herd for Backend
If you are using **Herd** for the backend, you can simply run:
```sh
npm run dev
```
The frontend will automatically connect to `http://car-inventory-be.test`.

#### If Not Using Herd
If you are **not** using Herd, you must update the API base URL:
1. Open `src/services/apiService.js`
2. Change `API_BASE_URL` to match your backend URL, for example:
```js
const API_BASE_URL = "http://127.0.0.1:8000";
```
3. Then start the development server:
```sh
npm run dev
```

### Troubleshooting
- **If API requests fail**: Ensure the backend is running and CORS is properly configured.
- **If using `php artisan serve`**, make sure you are using `http://127.0.0.1:8000` in `API_BASE_URL`.


