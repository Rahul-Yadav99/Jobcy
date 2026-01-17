import { Redirect } from "expo-router";
import { useState } from "react";

export default function Index() {
    const [isLogin, setIsLogin] = useState(false);
    return isLogin
        ? <Redirect href="/(student)" />
        : <Redirect href="/(auth)" />;
}
