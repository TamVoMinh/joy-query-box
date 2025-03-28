# Joy Query Box

A React component for building and parsing SQL-like queries with natural language support. This component provides an intuitive interface for constructing complex queries with auto-completion and syntax highlighting.

## Features

- 🎯 SQL-like query syntax
- 🔍 Auto-completion for field names
- 💡 Syntax highlighting
- 🎨 Customizable field suggestions
- 📝 Natural language support
- 🔄 Real-time query parsing

## Installation

```bash
npm install joy-query-box
# or
yarn add joy-query-box
```

## Usage

```jsx
import { QueryBox } from 'joy-query-box';

const words = [
    { word: 'company', desc: 'Company name', type: 'string' },
    { word: 'age', desc: 'Employee age', type: 'number' },
    { word: 'status', desc: 'Account status', type: 'string', options: ['active', 'pending', 'inactive'] },
    { word: 'isVerified', desc: 'Verification status', type: 'boolean' }
];

const MyComponent = () => {
    const handleSearch = (error, parsed, query) => {
        if (error) {
            console.error('Query error:', error);
        } else {
            console.log('Parsed query:', parsed);
        }
    };

    return (
        <QueryBox
            words={words}
            onSearch={handleSearch}
        />
    );
};
```

## Supported Operators

### Comparison Operators
- `=` Equal
- `>` Greater than
- `>=` Greater than or equal
- `<` Less than
- `<=` Less than or equal

### Text Operators
- `like` Pattern match (use % as wildcard)
- `contains` Contains text
- `startwith` Starts with

### Special Operators
- `is` Boolean check (e.g., `isVerified is true`)
- `in` Value in set (e.g., `status in ('active', 'pending')`)
- `between` Range check (e.g., `age between 25 and 35`)

### Logical Operators
- `&` AND
- `|` OR
- `()` Grouping

## Query Examples

```sql
-- Simple comparison
age >= 25 & salary <= 100000

-- Text search with wildcards
company like 'Tech%' & email contains '@company.com'

-- Boolean and set operations
isVerified is true & status in ('active', 'pending')

-- Range check
age between 25 and 35

-- Complex conditions
(department = 'Engineering' & salary > 80000) | (department = 'Sales' & salary > 60000)

-- Mixed operators
(company like '%Tech%' | department = 'IT') & age > 21 & isVerified is true
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `words` | `Array<QuerySuggestion>` | Array of field suggestions for auto-completion |
| `onSearch` | `(error: Error \| null, parsed: QueryExpression \| null, query: string) => void` | Callback function when query changes |
| `className` | `string` | Optional CSS class name |
| `id` | `string` | Optional element ID |

### QuerySuggestion Type

```typescript
interface QuerySuggestion {
    word: string;           // Field name
    desc: string;          // Field description
    type: 'string' | 'number' | 'boolean' | 'date';  // Field type
    options?: string[];    // Optional array of valid values for the field
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## License

MIT
