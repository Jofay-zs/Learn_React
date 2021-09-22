# JSX Rules
## Return single element
You can return several elements but you need to keep in mind that this elements must be inside an element, you can't return more than on element.
```js
//This is ok, because you are returning oly one element
function Greeting(){
  return (
    <div>
      <h1>Hi</h1>
      <p>Lorem ipsum dolor sit amet.</p>
      <ul>
        <li><a href="#">Link-01</a></li>
        <li><a href="#">Link-02</a></li>
        <li><a href="#">Link-03</a></li>
      </ul>
    </div>
  )
}
// But not this, because you are returning two elements (two divs)
function Greeting(){
  return (
    <div>
      <h1>Hi</h1>
      <p>Lorem ipsum dolor sit amet.</p>
      <ul>
        <li><a href="#">Link-01</a></li>
        <li><a href="#">Link-02</a></li>
        <li><a href="#">Link-03</a></li>
      </ul>
    </div>
    <div></div>
  )
}
```
## div / section / article or fragment
Don't use a lot of divs, if you need to make a lot of "boxes" you can also use sections, articles, fragments, spans, headings...
## use camelCase for html attribute
```js
<div className="" onClick=""></div>
// Se that it's importat to write the attributes in camelCase
```
## close every element
```js
<input/>
<img/>
```
## formating
Don't forget the returns (), all need to be inside it.