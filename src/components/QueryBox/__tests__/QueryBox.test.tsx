import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryBox } from '../QueryBox';

describe('QueryBox', () => {
    const mockOnSearch = jest.fn();

    beforeEach(() => {
        mockOnSearch.mockClear();
    });

    it('renders successfully', () => {
        render(<QueryBox onSearch={mockOnSearch} />);
        const queryBox = screen.getByRole('search');
        expect(queryBox).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const customClass = 'custom-class';
        render(<QueryBox onSearch={mockOnSearch} className={customClass} />);
        const queryBox = screen.getByRole('search');
        expect(queryBox).toHaveClass(customClass);
    });

    it('uses provided id', () => {
        const customId = 'custom-id';
        render(<QueryBox onSearch={mockOnSearch} id={customId} />);
        const editor = screen.getByRole('search').querySelector(`#${customId}`);
        expect(editor).toBeInTheDocument();
    });
}); 