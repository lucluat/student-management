import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppConfig} from "./AppConfig";
import AuthGuard from "./guard/AuthGuard";
import DashBoardAdmin from "./layout/admin/DashBoardAdmin";
import StudentManagement from "./page/StudentManagement";

function App() {
    return (
        <div className="App">
            <BrowserRouter basename={AppConfig.apiUrl}>
                <Routes>
                    <Route
                        path="/admin/student-management"
                        element={
                            <AuthGuard>
                                <DashBoardAdmin>
                                    <StudentManagement />
                                </DashBoardAdmin>
                            </AuthGuard>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
