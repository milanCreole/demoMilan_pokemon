import React from 'react';
import {render} from '@testing-library/react-native';
import InfoCard from '../src/Components/Cards/InfoCard';

describe('InfoCard', () => {
  it('renders InfoCard with the provided title and value', () => {
    const title = 'Name';
    const value = 'Pikachu';

    const {getByText, getByTestId} = render(
      <InfoCard title={title} value={value} />,
    );

    // Check if the title and value are rendered correctly
    expect(getByText(title)).toBeDefined();
    expect(getByText(value)).toBeDefined();
  });

  it('renders InfoCard with different title and value', () => {
    const title = 'Height';
    const value = '40 cm';

    const {getByText} = render(<InfoCard title={title} value={value} />);

    // Check if the title and value are rendered correctly
    expect(getByText(title)).toBeDefined();
    expect(getByText(value)).toBeDefined();
  });
});
