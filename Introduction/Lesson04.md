# Intro to React hooks

## UseEffect

```jsx
import { useEffet } from "react";
```

useEffect is a fucntion from react, that allow us to watch the window and when something change or happen we active something. Later with examples I will explain better.

### Basic structure

The basic structure of useEffect is (name of the fuction), (), and inside these () useEffect recive two parameters. The second paramenter is an array, where we can find a list of variables, and the fisrt parameter is a fuction that runs when some of the vaariables inside the array change.

```jsx
useEffect(function, [var01, var02, var03]);
```

You have two ways to create the fuction, with a normal function outside the useEffect fuction or with the fuction inside the useEffect fuction.

```jsx
// Outside
const myFucntion = () => {
  return console.log("Something");
};
useEffect(myFunction, []);

// Inside
useEffect(() => {
  return console.log("Something");
}, []);
```

### Empty useEffect

If we leave the array empty the function will run only once when the page finishes loading.

```jsx
useEffect(() => {
    return console.log('Hi, I'm a useEffect that runs only one time, once the page load, because it has an empty dependency array');
}, []);
```

### Always useEffect

This is a useEffect that always is running so with this you can make like a infinite loop, but it's not very recommended.

```
useEffect(() => {
    console.log('This is a useEffect that runs always that change a variable');
  })
```

## Getting data from our app

Imagine that we have an app and we want to know the information that our user is entering, how do we know it?

```jsx
const showInfo = (event) => {
  console.log(event.target.value);
  // event=input - target= we choose the parameter (event) - value= value of the choosed parameter.
};

return (
  <input onChange={showInfo} type="text" />
  // Also you can write the function inside the {}
);
```

In the block of code above we have an input of html that have an event property. There are several events propertys like onchange, onclick, hover, focus..., so in our piece of html when the input change this will run the fuction inside the {}. showInfo is a function that recive a parameter, when the fuction is called will print on the console the actual value of the input.

## useState

useState allow us to declare variables in react.

```jsx
const [exampleVariable, setExampleVariable] = useState("");
```

As you can see above, when you want to create a variable in React, you'll need to create an Array with two values.

- The first value is the name of the variable and it serves to get the information of that variable.

- In general the second value receives the name of set and the name of the variable. It serves to change the value of our variable.

And finally the word useState and inside the () the initial value that we want for the variable.

> Remeber if you want to use useState you'll need to import useState.

## Example 01

```jsx
const [userName, setUserName] = useState("");

const sendMessage = () => {
  console.log("Hi my name is", userName);
};

return (
  <form>
    <input
      onChange={(e) => {
        setUserName(e.target.value);
      }}
      type="text"
    />
    <button onClick={sendMessage} type="button">
      Submit data
    </button>
  </form>
);
```

In the code above first we declare a variable, then we create an arrow function that print on console a message, finally we have a jsx code block which contains and input and a button. The input has an onChange event, which once the input content change it will save the info in our variable. And the button has an onClick event, which once the user click the button, it will print the actual info inside our variaable, thanks to the function.

## Example 02

```jsx
const Example02 = () => {
  //   At this part I create the three variables that I'm going to use through the example
  const [age, setAge] = useState("");
  const [isMinor, setIsMinor] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  useEffect(() => {
    if (age >= 18) {
      setIsMinor(false);
    } else {
      setIsMinor(true);
    }
  }, [age]);

  return (
    <form className="flex flex-col justify-center items-center">
      <h2>Car creation form</h2>
      <label htmlFor="age">
        Please insert your age:
        <input
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
          type="number"
          name="age"
          className="border border-gray-700 ml-1"
        />
      </label>
      {isMinor ? (
        <span className="bg-red-400 border border-red-700 rounded-md py-2 px-4 my-2 text-3xl">
          You are a minor! You can't enter
        </span>
      ) : (
        <span className="bg-green-400 border border-green-700 rounded-md py-2 px-4 my-2 text-3xl">
          You can enter
        </span>
      )}
      <button
        type="button"
        onClick={() => setShowAdditionalFields(!showAdditionalFields)}
        className="text-white bg-indigo-500 border border-indigo-700 rounded-md py-2 px-4 my-1"
      >
        Show additional fields
      </button>
      {showAdditionalFields && (
        <div className="block">
          <div>
            <input
              placeholder="Insert a value"
              type="text"
              className="py-2 px-4 bg-indigo-500 border border-indigo-700 rounded-md my-2 text-white"
            />
          </div>
          <div>
            <input
              placeholder="Insert a value"
              type="text"
              className="py-2 px-4 bg-indigo-500 border border-indigo-700 rounded-md my-2 text-white"
            />
          </div>
          <div>
            <input
              placeholder="Insert a value"
              type="text"
              className="py-2 px-4 bg-indigo-500 border border-indigo-700 rounded-md my-2 text-white"
            />
          </div>
          <div>
            <input
              placeholder="Insert a value"
              type="text"
              className="py-2 px-4 bg-indigo-500 border border-indigo-700 rounded-md my-2 text-white"
            />
          </div>
          <div>
            <input
              placeholder="Insert a value"
              type="text"
              className="py-2 px-4 bg-indigo-500 border border-indigo-700 rounded-md my-2 text-white"
            />
          </div>
        </div>
      )}
    </form>
  );
};
```