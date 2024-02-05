import React, {forwardRef} from 'react';
import type {ForwardedRef} from 'react';
import {View} from 'react-native';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import ROUTES from '@src/ROUTES';
import FormHelpMessage from './FormHelpMessage';
import MenuItemWithTopDescription from './MenuItemWithTopDescription';

type WorkspaceSelectorProps = {
    /** Form error text. e.g when no workspace is selected */
    errorText?: string;

    /** Current selected workspace  */
    value?: string;

    /** inputID used by the Form component */
    // eslint-disable-next-line react/no-unused-prop-types
    inputID: string;
};

function WorkspaceSelector({errorText = '', value: workspace}: WorkspaceSelectorProps, ref: ForwardedRef<View>) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    return (
        <View>
            <MenuItemWithTopDescription
                shouldShowRightIcon
                title={workspace}
                ref={ref}
                // descriptionTextStyle={countryTitleDescStyle}
                description={translate('workspace.common.workspace')}
                onPress={() => {
                    const activeRoute = Navigation.getActiveRouteWithoutParams();
                    Navigation.navigate(ROUTES.NEW_CHAT_WORKSPACE_OPTIONS.getRoute(workspace ?? '', activeRoute));
                }}
            />
            <View style={styles.ml5}>
                <FormHelpMessage message={errorText} />
            </View>
        </View>
    );
}

WorkspaceSelector.displayName = 'WorkspaceSelector';

export default forwardRef(WorkspaceSelector);
