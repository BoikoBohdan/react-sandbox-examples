## DOM Rerender
### TLDR

We have two nodes of text with timers which updated each second
- First node has each hour, minute and second separately rendered
- Second Node has all params in one string

We have 2 buttons 
- First sets color of both texts to red via React state
- Second uses `document.getElementById` to setup style for second timer directly

### React Virtual DOM and Direct DOM Manipulation

This demo illustrates an important concept in React: the Virtual DOM and potential issues when mixing it with direct DOM manipulation.

#### How React's Virtual DOM Works
1. React maintains a lightweight copy of the DOM called the Virtual DOM
2. When state changes occur, React:
   - Creates a new Virtual DOM tree with the updates
   - Compares it with the previous Virtual DOM (diffing)
   - Calculates the minimal set of actual DOM updates needed
   - Applies only the necessary changes to the real DOM

#### The Problem with Direct DOM Manipulation
In this demo, we show two approaches to updating the DOM:
1. **React Way** (first button): 
   - Updates happen through state (`setBgColor`)
   - React is aware of all changes
   - Virtual DOM properly tracks and reconciles updates

2. **Direct DOM Access** (second button):
   - Bypasses React's Virtual DOM by using `document.getElementById`
   - React is unaware of these changes
   - Can lead to inconsistencies because:
     - React may overwrite these direct changes on next render
     - State in React doesn't reflect actual DOM state
     - Future React updates might behave unexpectedly

#### Best Practices
- Always prefer React's state management over direct DOM manipulation
- If you must use direct DOM manipulation:
  - Use refs instead of `document.getElementById`
  - Consider using `useEffect` to handle side effects
  - Be aware that React may overwrite your changes
  - Document these exceptions clearly for maintainability

### Assumption
This demo assumes basic familiarity with React's rendering cycle and state management. It demonstrates why following React's paradigms is important for maintaining predictable application behavior.
