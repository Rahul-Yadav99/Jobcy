import { StyleSheet } from "react-native";
import { colors, fontSize, headingSize } from "./theme";

export const typography = StyleSheet.create({
    h1: {
        fontSize: headingSize.h1,
        fontWeight: 'bold',
        color: colors.primaryTextColor,
    },
    h2: {
        fontSize: headingSize.h2,
        fontWeight: "700",
        color: colors.primaryTextColor,
    },
    h3: {
        fontSize: headingSize.h3,
        fontWeight: "600",
        color: colors.primaryTextColor,
    },
    h4: {
        fontSize: headingSize.h4,
        fontWeight: "600",
        color: colors.primaryTextColor,
    },
    h5: {
        fontSize: headingSize.h5,
        fontWeight: "500",
        color: colors.secondaryTextColor,
    },
    body: {
        fontSize: fontSize.sm,
        color: colors.secondaryTextColor,
    },
})