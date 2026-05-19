import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const user = params.get("user");

        if (token && user) {
            localStorage.setItem("auth_token", token);
            localStorage.setItem("auth_user", user);
            navigate("/");
            window.location.reload();
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-app-green text-lg font-semibold">Signing you in with Google...</p>
        </div>
    );
};

export default GoogleCallback;