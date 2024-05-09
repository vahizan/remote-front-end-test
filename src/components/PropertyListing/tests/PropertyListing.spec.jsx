import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { within } from '@testing-library/dom';
import PropertyListing from '../PropertyListing';
import { DUMMY_PROPERTY } from './__mocks__/mockProperties';
import { act } from 'react-dom/test-utils';
import {API_URL} from "../../../constants/apiConstants";

describe('PropertyListing', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(Array(5).fill(DUMMY_PROPERTY)),
        });
    });

    afterEach(jest.restoreAllMocks);

    it('should render five property cards', async () => {
        render(<PropertyListing />);
        const propertiesList = screen.getByRole('list');
        const propertyCards = await within(propertiesList).findAllByRole('listitem');
        expect(propertyCards).toHaveLength(5);
    });

    it('should call property listing endpoint', async () => {
        await act(() => {
            render(<PropertyListing />);
        });

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_URL}/properties`);
        });
    });
});
