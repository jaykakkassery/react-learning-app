// ============================================================
//  JSX PLAYGROUND
//  This file is just for experimenting. Break things freely.
//  Visit it at: http://localhost:5173/playground
//  Save the file after any change — the browser updates instantly.
// ============================================================


// ── IMPORTS ──────────────────────────────────────────────────────────────────
//
// Before you can use any component or function, you must import it.
// Imports are always at the very top of the file.
//
// HOW TO READ AN IMPORT:
//   import { ThingYouWant } from 'where-it-lives';
//
// The names inside { } must exactly match what the library exports.
// If you remove a name from here but still use it below, TypeScript
// will show a red underline saying "Cannot find name 'Container'".
//
// '@mantine/core' is the Mantine component library installed in node_modules/.
// Everything between { } is one component we want to use in this file.
//
import { Container, Title, Text, Stack, Button, Badge, Card, Group } from '@mantine/core';
//       │           │      │     │       │       │     │     └─ Group: horizontal row layout
//       │           │      │     │       │       │     └─ Card: boxed content block
//       │           │      │     │       │       └─ Badge: small pill label
//       │           │      │     │       └─ Button: clickable button
//       │           │      │     └─ Stack: vertical column layout
//       │           │      └─ Text: paragraph / span of text
//       │           └─ Title: heading (h1, h2, h3...)
//       └─ Container: centres content and limits max-width

// 'react' is the React library itself.
// useState is a Hook — a special function that adds state to a component.
import { useState } from 'react';

// HOW TO DISCOVER WHAT PROPS A COMPONENT ACCEPTS:
//   1. Type the component tag, press Space inside it — VS Code shows all props
//   2. Hover your mouse over any prop name — tooltip explains it
//   3. Type a wrong value — TypeScript underlines it and tells you the correct options
//   4. Visit mantine.dev and search the component name for full documentation


// ─────────────────────────────────────────────────────────────────────────────
// EXPERIMENT 1: Plain JSX
// ─────────────────────────────────────────────────────────────────────────────
//
// This is the simplest React component possible.
//
// A component is just a JavaScript function that:
//   1. Has a name starting with a Capital letter (Greeting, not greeting)
//   2. Returns JSX — the HTML-like syntax you see inside the return()
//
// The parentheses after 'return' are needed when JSX spans multiple lines.
// They do not do anything special — they just let you write across lines.
//
// THINGS TO TRY:
//   - Change "Hello from a component!" to something else and save
//   - Add a third line: <p>I am learning React!</p>
//   - Wrap everything in a Mantine <Stack gap="sm"> instead of <div>
//
function Greeting() {
  return (
    // Every component must return exactly ONE root element.
    // Here <div> is the single root that wraps everything.
    // If you try to return two elements side by side without a wrapper,
    // TypeScript will error. Use <> ... </> (called a Fragment) to wrap
    // without adding an extra HTML element.
    <div>
      <h2>Hello from a component!</h2>
      <p>Try changing this text and saving the file.</p>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// EXPERIMENT 2: Props
// ─────────────────────────────────────────────────────────────────────────────
//
// Props are how you pass data INTO a component from outside.
// Think of props like the inputs to a function — the component can produce
// different output depending on what values it receives.
//
// STEP 1: Define a TypeScript type that describes the props.
//         This tells TypeScript (and you) what data this component expects.
//
type HotelNameProps = {
  name: string;    // must be a string  — e.g. "Grand Plaza Hotel"
  rating: number;  // must be a number  — e.g. 4.8
};
//
// STEP 2: Write the function. Destructure the props object in the parameter.
//
//   { name, rating }  means: "pull 'name' and 'rating' out of the props object"
//
//   It is shorthand for:
//     function HotelName(props: HotelNameProps) {
//       const name   = props.name;
//       const rating = props.rating;
//     }
//
function HotelName({ name, rating }: HotelNameProps) {
  return (
    // { } curly braces inside JSX let you embed any JavaScript expression.
    // {name} reads the value of the 'name' prop and puts it on screen.
    // {rating} does the same for the number.
    <Text fw={700}>
      {name} — rated {rating} / 5
    </Text>
  );
}
//
// STEP 3: Use the component and pass the data as attributes:
//   <HotelName name="Grand Plaza Hotel" rating={4.8} />
//
// Notice: string values use "quotes", number values use {curly braces}.
// This is a JSX rule — numbers and expressions always go in { }.
//
// THINGS TO TRY:
//   - Add a 'city' prop (add it to the type AND the function AND the usage below)
//   - Make rating optional by writing  rating?: number  in the type
//   - Show a star emoji next to the rating: ★ {rating}


// ─────────────────────────────────────────────────────────────────────────────
// EXPERIMENT 3: useState — data that changes over time
// ─────────────────────────────────────────────────────────────────────────────
//
// Props come from outside and do not change. State is data that lives
// INSIDE the component and CAN change. When state changes, React
// automatically re-renders the component to show the updated value.
//
function Counter() {
  // useState(0) does two things:
  //   1. Creates a state variable called 'count', starting at 0
  //   2. Creates a function called 'setCount' to update it
  //
  // The naming convention is: [value, setValue]
  // You can name them anything but this pattern is universal in React.
  //
  const [count, setCount] = useState(0);
  //     │       └─ setCount(newValue) — call this to change the count
  //     └─ count — the current value, use it in JSX like any variable

  return (
    // Group arranges children in a horizontal row with gap="md" spacing.
    <Group gap="md">

      {/* {count} reads the current value of the state variable */}
      <Text>Count: {count}</Text>

      {/* onClick receives a function to run when the button is clicked.
          () => setCount(count + 1) is an arrow function.
          It means: "when clicked, call setCount with the new value count+1".
          React then re-renders the component with the new count. */}
      <Button size="sm" onClick={() => setCount(count + 1)}>+1</Button>

      {/* color="red" gives this button a red colour scheme */}
      <Button size="sm" color="red" onClick={() => setCount(count - 1)}>-1</Button>

    </Group>
  );
  //
  // IMPORTANT RULE: Never do  count = count + 1  directly.
  // React does not know about direct assignments — it only knows to
  // re-render when you call setCount(). Always use the setter function.
  //
  // THINGS TO TRY:
  //   - Add a Reset button:  <Button onClick={() => setCount(0)}>Reset</Button>
  //   - Change the starting value from 0 to 10:  useState(10)
  //   - Add a second state:  const [name, setName] = useState('Jay')
  //   - Show the name in the JSX and add a button to change it
}


// ─────────────────────────────────────────────────────────────────────────────
// EXPERIMENT 4: Conditional rendering
// ─────────────────────────────────────────────────────────────────────────────
//
// React lets you show different JSX depending on a condition.
// This is how loading spinners, error messages, and toggles work.
//
function AvailabilityBadge() {
  // State starts as true (available).
  // Clicking Toggle will flip it to false, then back to true, and so on.
  const [available, setAvailable] = useState(true);

  return (
    <Group gap="md">

      {/* PATTERN: ternary operator for conditional JSX
          condition ? valueIfTrue : valueIfFalse

          available ? 'green' : 'red'
          means: "if available is true, use 'green', otherwise use 'red'"

          The same ternary is used for the badge text:
          available ? 'Available' : 'Fully Booked' */}
      <Badge color={available ? 'green' : 'red'}>
        {available ? 'Available' : 'Fully Booked'}
      </Badge>

      {/* variant="subtle" makes the button look like plain text with no background */}
      {/* !available means "the opposite of available"
          If available is true,  !available is false
          If available is false, !available is true
          So setAvailable(!available) flips the value each click */}
      <Button size="xs" variant="subtle" onClick={() => setAvailable(!available)}>
        Toggle
      </Button>

    </Group>
  );
  //
  // ALTERNATIVE PATTERN — using && for "show only if true":
  //   {available && <Text c="green">Rooms ready!</Text>}
  //   This shows the Text only when available is true.
  //   When available is false, nothing is rendered.
  //
  // THINGS TO TRY:
  //   - Change the Badge to show a third state using a string instead of boolean:
  //       const [status, setStatus] = useState('available')
  //       Then cycle through 'available' → 'limited' → 'booked' on each click
  //   - Add an {available && <Text>Book now before it's gone!</Text>} line
}


// ─────────────────────────────────────────────────────────────────────────────
// EXPERIMENT 5: Rendering a list with .map()
// ─────────────────────────────────────────────────────────────────────────────
//
// In React you almost never write repeated JSX by hand.
// Instead you store data in an array and use .map() to turn each
// item into a JSX element automatically.
//
// This data lives OUTSIDE the component — it never changes, so it
// does not need to be state. It is just a constant array.
//
const SAMPLE_HOTELS = [
  { id: 1, name: 'Grand Plaza', city: 'New York' },
  { id: 2, name: 'Sunset Resort', city: 'Miami' },
  { id: 3, name: 'Mountain Lodge', city: 'Denver' },
];

function HotelList() {
  return (
    // Stack arranges children in a vertical column with gap="xs" spacing.
    <Stack gap="xs">

      {/* .map() loops through the array.
          For each item it runs the arrow function and collects the JSX returned.

          hotel => ( ... )  means: "for each hotel object, return this JSX"
          Inside the arrow function, 'hotel' is the current item:
            hotel.id   → 1, then 2, then 3
            hotel.name → 'Grand Plaza', then 'Sunset Resort', etc.
            hotel.city → 'New York', then 'Miami', etc. */}
      {SAMPLE_HOTELS.map(hotel => (

        // key={hotel.id} — REQUIRED on every element inside .map()
        // React uses the key to track which item is which when the list
        // updates. Without it React would re-render the entire list on
        // every change instead of only the changed items.
        // Always use a unique, stable value — the database id is perfect.
        // Never use the array index (0, 1, 2) as a key — it breaks when
        // items are added, removed, or reordered.
        <Text key={hotel.id}>
          {hotel.id}. {hotel.name} — {hotel.city}
        </Text>

      ))}

    </Stack>
  );
  //
  // THINGS TO TRY:
  //   - Add a 'price' field to each hotel in the array and display it
  //   - Replace <Text> with a Mantine <Card> for each hotel
  //   - Add a fourth hotel to the SAMPLE_HOTELS array — it appears automatically
  //   - Move SAMPLE_HOTELS inside the component and make it useState so
  //     you can add a "Add hotel" button
}


// ─────────────────────────────────────────────────────────────────────────────
// THE PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
//
// This is the component that React Router renders when you visit /playground.
// It is the only component in this file that is exported (notice 'export').
//
// 'export' makes it available to other files. app.tsx imports PlaygroundPage
// and mounts it at the /playground route. All the other components above
// (Greeting, Counter, etc.) are private to this file — they are not exported
// because no other file needs them.
//
export function PlaygroundPage() {
  return (
    // Container: centres the page content and limits width to ~960px.
    // py="xl" adds padding top and bottom (py = padding on Y axis = top+bottom).
    <Container size="md" py="xl">

      {/* Title renders an <h2> with Mantine heading styles.
          mb="xs" adds a small margin below it. */}
      <Title mb="xs">JSX Playground</Title>

      {/* Text with c="dimmed" renders grey secondary text.
          mb="xl" pushes the cards below it down. */}
      <Text c="dimmed" mb="xl">
        Edit <code>src/app/playground/index.tsx</code> and results appear
        instantly. Nothing here affects the real app.
      </Text>

      {/* Stack arranges the five experiment cards in a vertical column.
          gap="xl" puts generous space between each card. */}
      <Stack gap="xl">

        {/* ── Card: a boxed container with border, padding, rounded corners ──
            withBorder  → adds a 1px border  (shorthand for withBorder={true})
            padding="lg" → inner spacing = lg token (~20px)
            radius="md"  → rounded corners = md token */}

        <Card withBorder padding="lg" radius="md">
          {/* fw={700} makes this label bold */}
          <Text fw={700} mb="sm">Experiment 1 — Plain JSX</Text>
          {/* <Greeting /> calls the Greeting function defined above.
              React runs it and inserts whatever JSX it returns here. */}
          <Greeting />
        </Card>

        <Card withBorder padding="lg" radius="md">
          <Text fw={700} mb="sm">Experiment 2 — Props</Text>
          {/* We use HotelName twice with different prop values.
              Each call is completely independent — they do not share state. */}
          <HotelName name="Grand Plaza Hotel" rating={4.8} />
          <HotelName name="City Inn" rating={3.5} />
        </Card>

        <Card withBorder padding="lg" radius="md">
          <Text fw={700} mb="sm">Experiment 3 — useState (counter)</Text>
          {/* Counter manages its own state internally.
              If you placed two <Counter /> here, they would count independently. */}
          <Counter />
        </Card>

        <Card withBorder padding="lg" radius="md">
          <Text fw={700} mb="sm">Experiment 4 — Conditional rendering</Text>
          <AvailabilityBadge />
        </Card>

        <Card withBorder padding="lg" radius="md">
          <Text fw={700} mb="sm">Experiment 5 — Rendering a list</Text>
          <HotelList />
        </Card>

      </Stack>
    </Container>
  );
}
