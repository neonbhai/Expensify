import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
import React, {useCallback, useMemo, useEffect} from 'react';
import _ from 'underscore';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import ScreenWrapper from '@components/ScreenWrapper';
import SelectionList from '@components/SelectionList';
import useLocalize from '@hooks/useLocalize';
import Navigation from '@libs/Navigation/Navigation';
import * as PolicyUtils from '@libs/PolicyUtils';
import CONST from '@src/CONST';
import {withOnyx} from 'react-native-onyx';
import ONYXKEYS from '@src/ONYXKEYS';

const propTypes = {
    /** Route from navigation */
    route: PropTypes.shape({
        /** Params from the route */
        params: PropTypes.shape({
            /** Currently selected workspace */
            workspace: PropTypes.string,

            /** Route to navigate back after selecting a currency */
            backTo: PropTypes.string,
        }),
    }).isRequired,

    /** Navigation from react-navigation */
    navigation: PropTypes.shape({
        /** getState function retrieves the current navigation state from react-navigation's navigation property */
        getState: PropTypes.func.isRequired,
    }).isRequired,

    /** The list of policies the user has access to. */
    policies: PropTypes.objectOf(
        PropTypes.shape({
            /** The policy type */
            type: PropTypes.oneOf(_.values(CONST.POLICY.TYPE)),

            /** The name of the policy */
            name: PropTypes.string,

            /** The ID of the policy */
            id: PropTypes.string,
        }),
    ).isRequired,
};

function WorkspaceOptionsPage({route, navigation, policies}) {
    const {translate} = useLocalize();
    const selectedWorkspace = lodashGet(route, 'params.workspace');

    const workspaceOptions = useMemo(
        () =>
            _.map(PolicyUtils.getActivePolicies(policies), (policy) => ({
                label: policy.name,
                keyForList: policy.id,
                value: policy.id,
                text: policy.name,
            })),
        [policies],
    );

    const selectWorkspace = useCallback(
        (option) => {
            const backTo = lodashGet(route, 'params.backTo', '');

            // Check the navigation state and "backTo" parameter to decide navigation behavior
            if (navigation.getState().routes.length === 1 && _.isEmpty(backTo)) {
                // If there is only one route and "backTo" is empty, go back in navigation
                Navigation.goBack();
            } else if (!_.isEmpty(backTo) && navigation.getState().routes.length === 1) {
                // If "backTo" is not empty and there is only one route, go back to the specific route defined in "backTo" with a workspace parameter
                Navigation.goBack(`${route.params.backTo}?workspace=${option.value}`);
            } else {
                // Otherwise, navigate to the specific route defined in "backTo" with a workspace parameter
                Navigation.navigate(`${route.params.backTo}?workspace=${option.value}`);
            }
        },
        [route, navigation],
    );

    return (
        <ScreenWrapper
            testID={WorkspaceOptionsPage.displayName}
            includeSafeAreaPaddingBottom={false}
        >
            <HeaderWithBackButton
                title={translate('workspace.common.workspace')}
                shouldShowBackButton
                onBackButtonPress={() => {
                    const backTo = lodashGet(route, 'params.backTo', '');
                    const backToRoute = backTo ? `${backTo}?workspace=${selectedWorkspace}` : '';
                    Navigation.goBack(backToRoute);
                }}
            />

            <SelectionList
                sections={[{data: workspaceOptions, indexOffset: 0}]}
                onSelectRow={selectWorkspace}
                initiallyFocusedOptionKey={selectedWorkspace}
                shouldUseDynamicMaxToRenderPerBatch
            />
        </ScreenWrapper>
    );
}

WorkspaceOptionsPage.displayName = 'WorkspaceOptionsPage';
WorkspaceOptionsPage.propTypes = propTypes;

export default withOnyx({
    policies: {
        key: ONYXKEYS.COLLECTION.POLICY,
    },
})(WorkspaceOptionsPage);

