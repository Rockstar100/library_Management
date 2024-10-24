import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import BookList from "./components/Books/BookList";
import AddBook from "./components/Books/AddBook";
import UpdateBook from "./components/Books/UpdateBook";
import AddMembership from "./components/Membership/AddMembership";
import UpdateMembership from "./components/Membership/UpdateMembership";
import IssueBook from "./components/Transactions/IssueBook";
import ReturnBook from "./components/Transactions/ReturnBook";
import FinePay from "./components/Transactions/FinePay";
import AddUser from "./components/UserManagement/AddUser";
import UpdateUser from "./components/UserManagement/UpdateUser";
import UserList from "./components/UserManagement/UserList";
import NavBar from "./components/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import MembershipList from "./components/Membership/MembershipList";
// import AddMembership from "./components/memberships/AddMembership";
// import UpdateMembership from "./components/memberships/UpdateMembership";
// App Component
function App() {
  return (
    <Router>
      <AppWithRoutes />
    </Router>
  );
}

// Separated the component that contains the routes and NavBar
function AppWithRoutes() {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="container">
      {/* Conditionally render NavBar */}
      {!isAuthRoute && (
        <NavBar
          onSearch={(searchTerm) => console.log("Searching:", searchTerm)}
        />
      )}

      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Book routes */}
        <Route path="/books" element={<BookList />} />
        <Route path="/books/add" element={<AddBook />} />
        <Route path="/books/update/:id" element={<UpdateBook />} />

        {/* Membership routes */}
        <Route path="/memberships" element={<MembershipList />} />
        <Route path="/memberships/add" element={<AddMembership />} />
        <Route path="/memberships/update/:id" element={<UpdateMembership />} />

        {/* Transaction routes */}
        <Route path="/books/issue/:id" element={<IssueBook />} />
        <Route path="/books/return" element={<ReturnBook />} />
        <Route path="/fine/pay" element={<FinePay />} />

        {/* User routes */}
        <Route path="/users" element={<UserList />} />
        <Route path="/user/add" element={<AddUser />} />
        <Route path="/user/update/:id" element={<UpdateUser />} />
      </Routes>
    </div>
  );
}

export default App;
