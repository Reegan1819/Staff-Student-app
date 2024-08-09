import MainPage from "../MainPage";
import StaffDashboard from "../Staff/StaffDashboard";
import StudentDashboard from "../Student/StudentDashboard";
import { MAIN_PAGE, STAFF_DASHBOARD, STUDENT_DASHBOARD } from "./endPoints";


console.log(MAIN_PAGE);


export const RouteList = [
  {
    path: MAIN_PAGE,
    component: MainPage,
  },
  {
    path: STUDENT_DASHBOARD,
    component: StudentDashboard,
  },
  {
    path: STAFF_DASHBOARD,
    component: StaffDashboard,
  },
];
