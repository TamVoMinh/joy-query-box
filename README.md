## joy-query-box
A react-text-box component which will transform simple expression as free-text to object
![Example](/assets/simple-query-example.png)

### Operators

|Operator & keyword   |       Meaning         | Property Name  |
|---------------------|-----------------------| ---------------|
|`=`                  | Equal                 | $eq            |
|`>`                  | Greater than          | $gt            |
|`>=`                 | Greater than or equal | $gte           |
|`<`                  | Less than             | $lt            |
|`<=`                 | Less than or equal    | $lte           |
|`like`               | Like                  | $like          |
|`contains`           | Contains              | $contains      |
|`startwith`          | StartWith             | $startWith     |
|`&`                  | And                   | $and           |
|`|`                  | Or                    | $or            |

### Features
* Syntax highlight
* Auto-complete on typing
* Result as object.

### Next update
* Smart auto-complete reply on primary types number, date, string (1.1.x)
* Support more operators [ in, between, from, to ]  (1.2.x)
### NPM Install & use
``npm i joy-query-box``

```jsx
import QueryBox from 'joy-query-box';
...
const suggessionwords = [
    {
        word: 'company',
        desc: 'Field: company name'
    },
    {
        word: 'email',
        desc: 'Field: Company Email'
    },
    {
        word: 'vat',
        desc: 'Field: Company VAT number'
    }
];

<QueryBox
    autoFocus
    word={suggessionwords}
    onSearch={this.handleOnSeach}
    queryText={"defaultText = 'a text value'"}
/>

```

## Run demo
1. ``git clone https://github.com/TamVoMinh/joy-query-box.git``
1. ``cd joy-query-box & npm install``
1. ``yarn start``

## Build component
* ``yarn build:component``

## Note
joy-query-box use bootstrap as default style.