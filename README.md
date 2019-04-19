## joy-query-box
A react-text-box component which will transform simple expression as free-text to object
![Example](/assets/simple-query-example.png)

### Operators

|Operator & Keyword   |       Meaning         | Property Name  |
|---------------------|-----------------------| ---------------|
|``=``                | Equal                 | $eq            |
|``>``                | Greater than          | $gt            |
|``>=``               | Greater than or equal | $gte           |
|``<``                | Less than             | $lt            |
|``<=``               | Less than or equal    | $lte           |
|``like``             | Like                  | $like          |
|``contains``         | Contains              | $contains      |
|``startwith``        | StartWith             | $startWith     |
|``&``                | And                   | $and           |
| ``\|``              | ``Or``                    | ``$or``            |

### Features
* Syntax highlight
* Auto-complete on typing
* Result as object.

### Next update
* Filter completions operator based on primary types: ``number, date, string`` (1.1.x)
* Filter completions based on a variable name & it's options (1.1.x)
* Support more operators  ``is, in, between`` (1.2.x)
* Support complex expression (1.3.x)

### NPM Install & use
```shell
npm i joy-query-box
```

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
    words={suggessionwords}
    onSearch={this.handleOnSeach}
    queryText={"defaultText = 'a text value'"}
/>

```

## Run demo
```shell
git clone https://github.com/TamVoMinh/joy-query-box.git
cd joy-query-box & npm install
yarn start
```

## Build component
```shell
yarn build:component
```

## Note
joy-query-box use bootstrap as default style.
