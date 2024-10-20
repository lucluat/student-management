import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthGuard from "./guard/AuthGuard";
import DashBoardAdmin from "./layout/admin/DashBoardAdmin";
import StudentManagement from "./page/StudentManagement";
import Login from "./layout/authentication/Login";
import Register from "./layout/authentication/Register";

function App() {
    return (
        <div className="App">
            <BrowserRouter basename={"/"}>
                <Routes>
                    <Route
                        path="/admin/student-management"
                        element={
                            <AuthGuard>
                                <DashBoardAdmin>
                                    <StudentManagement/>
                                </DashBoardAdmin>
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Login/>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <Register/>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
