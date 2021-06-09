import * as React from 'react';
import '@testing-library/jest-dom/extend-expect'
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import {render} from '@testing-library/react';
import Home from '../pages/home.jsx';

test('Home page test', async () => {
    const page  = render(<Home/>)
    page.queryByText('Pokedex Challenge'); 
    page.queryByText('Loading'); 
    await page.findByText('Bulbasaur')
    await act(async () => userEvent.click(page.getByText("Next")));
    page.queryByText('Pokedex Challenge'); 
    page.queryByText('Loading');
    await page.findByText('Blastoise')
})