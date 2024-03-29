import React from "react";
import { SafeAreaView, StyleSheet, Dimensions, View, Animated } from "react-native";
import * as shape from "d3-shape";
import Svg from "react-native-svg";
import { LinearGradient } from 'expo-linear-gradient';
import StaticTabbar from "./StaticBar";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const { width } = Dimensions.get("window");
const height = 64; // Bottom bar height
const Path = Svg;

const tabs = [

    {
        name: "home",
        text: "Home",
    },
    {
        name: "book",
        text: "Quiz",
    },
    {
        name: "profile",
        text: "Icon3",
    },
   
];
const tabWidth = width / tabs.length;
const backgroundColor = "white";

const getPath = () => {
    const left = shape.line().x(d => d.x).y(d => d.y)([
        { x: 0, y: 0 },
        { x: width, y: 0 },
    ]);
    const tab = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasis)([
        { x: width, y: 0 },
        { x: width + 5, y: 0 },
        { x: width + 10, y: 30 },
        { x: width + 15, y: height },
        { x: width + tabWidth - 15, y: height },
        { x: width + tabWidth - 10, y: 30 },
        { x: width + tabWidth - 5, y: 0 },
        { x: width + tabWidth, y: 0 },
    ]);
    const right = shape.line().x(d => d.x).y(d => d.y)([
        { x: width + tabWidth, y: 0 },
        { x: width * 2, y: 0 },
        { x: width * 2, y: height },
        { x: 0, y: height },
        { x: 0, y: 0 },
    ]);
    return `${left} ${tab} ${right}`;
};
const d = getPath();

export default class Tabbar extends React.PureComponent {
    /*
    props: 
    state,
    descriptors,
    navigation,
    */
    value = new Animated.Value(0);

    render() {
        const { value } = this;
        const translateX = value.interpolate({
            inputRange: [0, width],
            outputRange: [-width, 0],
        });

        const { state, descriptors, navigation } = this.props

        return (
            <>
                <View {...{ height, width }}>
                    <AnimatedSvg width={width * 2} {...{ height }} style={{ transform: [{ translateX }] }}>
                        <Path fill={backgroundColor} {...{ d }} />
                    </AnimatedSvg>
                    <View style={StyleSheet.absoluteFill}>
                        <LinearGradient
                            // Button Linear Gradient
                            colors={['white', 'white']} style={{ width: '100%', height: '100%', justifyContent: 'center' }}
                        >
                            <StaticTabbar {...{ tabs, value, state, descriptors, navigation }} />
                        </LinearGradient>
                    </View>
                </View>
                <SafeAreaView style={styles.container} />
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor,
    },
});