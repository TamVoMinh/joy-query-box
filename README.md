## joy-query-box
A react-text-box component which will transform simple expression as free-text to object
![Example](/assets/simple-query-example.png)

### Supported operators

|Key|Meaning|
|----|-------|
|`=` | Equal|
|`>` | Greater than|
|`>=`| Greater than or equal|
|`<` | Less than|
|`<=`| Less than or equal|
|`%=`| Like|
|`@=`| Contains|
|`$=`| StartWith|
|`&` | And|
|`|` | Or|

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
