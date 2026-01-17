import React from "react";
import { StyleSheet, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Login = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header} />
            <View style={styles.main}>
                <View style={styles.section1}></View>
                <View style={styles.section2}></View>
            </View>
            <View style={styles.footer} />
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        height: hp(100),
    },
    header: {
        height: hp(15),
        backgroundColor: "deeppink",
    },
    main: {
        height: hp(70),
        display: "flex",
        flexDirection: "row",
    },
    section1: {
        width: wp(50),
        backgroundColor: "tomato",
    },
    section2: {
        width: wp(50),
        backgroundColor: "skyblue",
    },
    footer: {
        height: hp(15),
        backgroundColor: "lightgreen",
    },
});