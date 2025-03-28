import '@testing-library/jest-dom';

// Mock window.ace
(window as any).ace = {
    edit: jest.fn(),
    acequire: jest.fn(() => ({
        TextHighlightRules: class {},
        addCompleter: jest.fn()
    }))
}; 