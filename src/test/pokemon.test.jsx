import * as React from 'react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import {render} from '@testing-library/react';
import Pokemon from '../pages/home.jsx';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
      pokemonId: '1',
    }),
    useRouteMatch: () => ({ url: '/pokemon/1' }),
  }));

test('Home page test', async () => {
    const page = render(<Pokemon/>)
    page.queryByText('Loading'); 
    await page.findByText('Bulbasaur')
    page.queryByText('Height'); 
    page.queryByText('7'); 


    // page.queryByText('Pokedex Challenge'); 
    // page.queryByText('Loading'); 
    // await page.findByText('Bulbasaur')
    // await act(async () => userEvent.click(page.getByText("Next")));
    // page.queryByText('Pokedex Challenge'); 
    // page.queryByText('Loading');
    // await page.findByText('Blastoise')
})