# Nested components
> Nested components = Componentes anidados
```js
function Introduction(){
  return(
    <div>
      <Greeting/>
      <Message/>
      <p>and it is a pleasure to great you</p>
    </div>
  );
}

function Message(){
  return(
    <p>I'm a message</p>
  );
}

const Greeting = () =>{
  return <h1>HI</h1>;
}
```