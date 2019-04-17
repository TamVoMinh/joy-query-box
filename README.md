## joy-query-box
A react-text-box component which will transform simple expression as free-text to object
![Example](/assets/simple-query-example.png)

### Operators

|Operator   |Meaning                | Property Name  |
|-----------|-----------------------| ---------------|
|`=`        | Equal                 | $eq            |
|`>`        | Greater than          | $gt            |
|`>=`       | Greater than or equal | $gte           |
|`<`        | Less than             | $lt            |
|`<=`       | Less than or equal    | $lte           |
|`%=`       | Like                  | $like          |
|`@=`       | Contains              | $contains      |
|`$=`       | StartWith             | $startWith     |
|`&`        | And                   | $and           |
|`|`        | Or                    | $or            |

### Keywords
|Keyword|Meaning        | Property Name  |
|-----------|-----------|----------------|
|like       |Like       | $like          |
|startwith  |Start With | $startWith     |
|contains   |Contains   | $contains      |


### NPM Install & use
``npm i joy-query-box``

```jsx
import QueryBox from 'joy-query-box';
...
<QueryBox
    autoFocus
    label="Simple query"
    placeholder="type condition here"
    onSearch={this.handleOnSeach}
    queryText={"defaultText = 'a text value'"}
/>

```

## Run demo
1. ``git clone https://github.com/TamVoMinh/joy-query-box.git``
1. ``cd joy-query-box & npm install``
1. ``npm start``

## Build component
* ``npm build:component``
