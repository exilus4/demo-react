import React from "react";

const LoginComponentModel = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    return {username, setUsername, password, setPassword}
}

export default LoginComponentModel;