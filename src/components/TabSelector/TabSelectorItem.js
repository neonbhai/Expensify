import {Animated} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/styles';
import themeColors from '../../styles/themes/default';
import PressableWithFeedback from '../Pressable/PressableWithFeedback';
import TabIcon from './TabIcon';
import TabLabel from './TabLabel';
import Hoverable from '../Hoverable';

const propTypes = {
    /** Function to call when onPress */
    onPress: PropTypes.func,

    /** Icon to display on tab */
    icon: PropTypes.func,

    /** Title of the tab */
    title: PropTypes.string,

    /** Animated background color value for the tab button */
    // eslint-disable-next-line
    backgroundColor: PropTypes.any,

    /** Animated opacity value while the label is inactive state */
    // eslint-disable-next-line
    inactiveOpacity: PropTypes.any,

    /** Animated opacity value while the label is in active state */
    // eslint-disable-next-line
    activeOpacity: PropTypes.any,

    /** Whether the tab is active */
    isFocused: PropTypes.bool,
};

const defaultProps = {
    onPress: () => {},
    icon: () => {},
    title: '',
    backgroundColor: '',
    inactiveOpacity: 1,
    activeOpacity: 0,
};

const AnimatedPressableWithFeedback = Animated.createAnimatedComponent(PressableWithFeedback);

function TabSelectorItem({icon, title, onPress, backgroundColor, activeOpacity, inactiveOpacity, isFocused}) {
    return (
        <Hoverable>
            {(isHovered) => (
                <AnimatedPressableWithFeedback
                    accessibilityLabel={title}
                    style={[styles.tabSelectorButton, isHovered && !isFocused ? {backgroundColor: themeColors.highlightBG} : {backgroundColor}]}
                    wrapperStyle={[styles.flex1]}
                    onPress={onPress}
                >
                    <TabIcon
                        icon={icon}
                        activeOpacity={activeOpacity}
                        inactiveOpacity={inactiveOpacity}
                        isHovered={isHovered}
                    />
                    <TabLabel
                        title={title}
                        activeOpacity={activeOpacity}
                        inactiveOpacity={inactiveOpacity}
                    />
                </AnimatedPressableWithFeedback>
            )}
        </Hoverable>
    );
}

TabSelectorItem.propTypes = propTypes;
TabSelectorItem.defaultProps = defaultProps;
TabSelectorItem.displayName = 'TabSelectorItem';

export default TabSelectorItem;
