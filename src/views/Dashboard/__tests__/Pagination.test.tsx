import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/views/Dashboard/Pagination';
import { expect } from '@jest/globals';

describe('Pagination Component', () => {
  const handlePrevPage = jest.fn();
  const handleNextPage = jest.fn();

  beforeEach(() => {
    render(
      <Pagination
        currentPage={1}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />,
    );
  });

  it('renders the current page number', () => {
    expect(screen.getByText('1'));
  });

  it('renders the previous and next page buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('calls handlePrevPage when the previous button is clicked', () => {
    const prevButton = screen.getAllByRole('button')[0];
    fireEvent.click(prevButton);
    expect(handlePrevPage).toHaveBeenCalledTimes(1);
  });

  it('calls handleNextPage when the next button is clicked', () => {
    const nextButton = screen.getAllByRole('button')[1];
    fireEvent.click(nextButton);
    expect(handleNextPage).toHaveBeenCalledTimes(1);
  });
});
