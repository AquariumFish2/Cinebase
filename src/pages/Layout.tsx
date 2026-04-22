import { Outlet } from "react-router";
import AppBar from "../components/AppBar";

export default function Layout() {
    return (
        <>
            <AppBar></AppBar>
            <Outlet></Outlet>
        </>
    )
}
