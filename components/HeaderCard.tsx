import React from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.7;
const SPACING = 16;

const HeaderCard = () => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToInterval={CARD_WIDTH + SPACING}
            decelerationRate="fast"
            contentContainerStyle={{
                paddingHorizontal: SPACING,
            }}
            style={{
                flexGrow: 0
            }}
        >
            {[
                require("@/assets/images/headcard.png"),
                require("@/assets/images/headcard1.png"),
                require("@/assets/images/headcard2.png"),
                require("@/assets/images/headcard3.png"),
            ].map((img, index) => (
                <View
                    key={index}
                    style={{
                        width: CARD_WIDTH,
                        marginRight: SPACING,
                        borderRadius: 16,
                        overflow: "hidden",
                        marginVertical: moderateScale(16),
                    }}
                >
                    <Image
                        source={img}
                        style={{
                            width: "100%",
                            height: 200,
                        }}
                        resizeMode="cover"
                    />
                </View>
            ))}
        </ScrollView>
    );
};

export default HeaderCard;
