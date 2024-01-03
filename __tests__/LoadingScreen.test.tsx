import React from 'react';
import {render} from '@testing-library/react-native';
import LoadingScreen from '../src/screens/CommonScreens/LoadingScreen';

describe('LoadingScreen', () => {
  it('renders the loading screen with the activity indicator', () => {
    const {getByTestId} = render(<LoadingScreen />);

    // Check if the activity indicator is rendered
    const loadingIndicator = getByTestId('isLoading');
    expect(loadingIndicator).toBeDefined();

    expect(loadingIndicator.parent).toContain({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    });
  });
});
