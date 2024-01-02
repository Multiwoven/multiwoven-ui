import Heading from './Heading';
import {render, screen} from '@testing-library/react'


describe('Dummy test', () => {
    test('should render Heading',()=>{
      render(<Heading>Some Random component</Heading>);
      expect(screen.getByText('Some Random component')).toBeVisible();
    })
  });
  