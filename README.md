# React Learning App — A Tutorial from Zero

This project is a hands-on tutorial for learning React and its ecosystem.
It is modeled after a real production React app  and built
up one step at a time. If you know a little JavaScript, this guide will walk
you through everything you need to understand how modern React development works.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [The Tech Stack — What and Why](#2-the-tech-stack--what-and-why)
3. [Running the Project](#3-running-the-project)
4. [The Project Structure](#4-the-project-structure)
5. [Core React Concepts](#5-core-react-concepts)
   - [What is React?](#51-what-is-react)
   - [JSX — HTML inside JavaScript](#52-jsx--html-inside-javascript)
   - [Components — the building blocks](#53-components--the-building-blocks)
   - [Props — passing data into a component](#54-props--passing-data-into-a-component)
   - [State — data that changes over time](#55-state--data-that-changes-over-time)
   - [Hooks — special React functions](#56-hooks--special-react-functions)
6. [TypeScript in React](#6-typescript-in-react)
7. [Understanding Every File in This Project](#7-understanding-every-file-in-this-project)
   - [index.html](#71-indexhtml)
   - [src/main.tsx](#72-srcmaintsx)
   - [src/app/query-client.ts](#73-srcappquery-clientts)
   - [src/app/app.tsx](#74-srcappapptsx)
   - [src/app/landing/index.tsx](#75-srcapplandingindextsx)
8. [The Provider Pattern Explained](#8-the-provider-pattern-explained)
9. [What is Vite?](#9-what-is-vite)
   - [The dev server and native ES modules](#91-the-dev-server--what-happens-when-you-run-npm-run-dev)
   - [Hot Module Replacement (HMR)](#92-hot-module-replacement-hmr--the-magic-of-instant-updates)
   - [Dev mode vs Production build](#93-dev-mode-vs-production-build)
10. [Node.js — JavaScript on the Server](#10-nodejs--javascript-on-the-server)
11. [npm — The Package Manager](#11-npm--the-package-manager)
12. [Express — The Web Server](#12-express--the-web-server)
13. [Client and Server Working Together](#13-client-and-server-working-together)
14. [Understanding the Server Files](#14-understanding-the-server-files)
    - [server/index.ts](#141-serverindexts)
    - [server/data.ts](#142-serverdatats)
    - [server/routes/hotels.ts](#143-serverrouteshotelsts)
15. [The Full Request-Response Journey](#15-the-full-request-response-journey)
    - [The hardcoded server response](#151-the-hardcoded-server-response)
    - [The complete flow, step by step](#152-the-complete-flow-step-by-step)
    - [What React does at each stage](#153-what-react-does-at-each-stage)
    - [Reading the Results page code](#154-reading-the-results-page-code)
16. [How the Landing Page Loads — End to End](#16-how-the-landing-page-loads--end-to-end)
    - [Step 1 — npm run dev](#step-1--you-type-npm-run-dev)
    - [Step 2 — Vite starts up](#step-2--vite-starts-up)
    - [Step 3 — Browser requests the page](#step-3--you-open-httplocalhost5173-in-the-browser)
    - [Step 4 — Browser requests main.tsx](#step-4--browser-requests-maintsx)
    - [Step 5 — The import chain fans out](#step-5--the-import-chain-fans-out)
    - [Step 6 — main.tsx code runs](#step-6--maintsx-code-runs)
    - [Step 7 — React renders App](#step-7--react-renders-app)
    - [Step 8 — React renders LandingPage](#step-8--react-renders-landingpage)
    - [Step 9 — Browser paints the screen](#step-9--browser-paints-the-screen)
17. [What We Will Build Next](#17-what-we-will-build-next)

---

## 1. Prerequisites

Before starting, make sure you have these installed on your machine.

### Node.js and npm

Node.js lets you run JavaScript outside of a browser. `npm` (Node Package Manager)
comes with Node.js and is how you install JavaScript libraries.

Check if you have them:

```bash
node --version   # should print something like v24.0.0
npm --version    # should print something like 12.0.0
```

If not installed, download from https://nodejs.org (choose the LTS version).

### A Code Editor

VS Code is recommended: https://code.visualstudio.com

Install these VS Code extensions for the best experience:
- **ESLint** — highlights code problems as you type
- **Prettier** — auto-formats your code
- **TypeScript Vue Plugin (Volar)** — better TypeScript support

---

## 2. The Tech Stack — What and Why

This project uses the same stack as a real hotel booking application.
Here is every tool, what it does, and why it exists.

### React (v19)

React is a JavaScript library for building user interfaces. Instead of writing
HTML in `.html` files and manipulating it with `document.getElementById(...)`,
React lets you write your UI as JavaScript functions. When your data changes,
React automatically updates the screen.

**Why not just use plain JavaScript?**
With plain JS, you have to manually find HTML elements and update them. React
handles all of that for you — you just describe what the screen should look
like, and React keeps it in sync with your data.

### TypeScript

TypeScript is JavaScript with types added. A "type" tells the computer what
kind of data a variable holds — for example, is it a number, a string, or an
object with specific fields?

```typescript
// Plain JavaScript — no idea what 'name' should be
function greet(name) {
  return "Hello " + name;
}

// TypeScript — 'name' must be a string. Editor will warn you if you pass a number.
function greet(name: string): string {
  return "Hello " + name;
}
```

TypeScript catches bugs before your code even runs, and it gives you
autocomplete suggestions in your editor.

### Vite

Vite is the build tool. In modern web development, you write code spread across
many files, but the browser needs to receive them efficiently. Vite:

- Takes all your TypeScript files and converts them to JavaScript (browsers
  can't run TypeScript directly)
- Bundles all your files together
- Gives you a local dev server with **hot reloading** — when you save a file,
  the browser updates instantly without a full page refresh

**Analogy:** Vite is like a factory that takes your raw materials (TypeScript
files) and produces a finished product (JavaScript the browser can run).

### React Router DOM (v5)

A React app is a single HTML page (`index.html`). When you go from the home
page to a details page, you are not actually loading a new HTML file — React
Router fakes it by showing and hiding different components based on the URL.

```
URL: /           → show LandingPage component
URL: /results    → show ResultsPage component
URL: /details/42 → show DetailsPage component for hotel #42
```

### TanStack React Query (v5)

React Query manages **fetching data from a server** (API calls). Without it,
you would need to write a lot of repetitive code to handle loading states,
errors, and re-fetching. React Query handles all of that:

- Shows a loading state while data is being fetched
- Caches the data so you do not re-fetch unnecessarily
- Re-fetches when the data goes stale
- Handles errors gracefully

### Mantine (v7)

Mantine is a UI component library. Instead of building a button or a text
input from scratch, Mantine gives you pre-built, styled components you can
use directly:

```tsx
// Without Mantine — you style everything yourself
<button style={{ padding: '8px 16px', background: 'blue', color: 'white' }}>
  Click me
</button>

// With Mantine — styled and accessible out of the box
<Button color="blue">Click me</Button>
```

Mantine also provides layout helpers (`Stack`, `Container`, `Group`) and
utility hooks.

### Zod

Zod is a **schema validation** library. When your app fetches data from an
API, you cannot know for certain that the response has the shape you expect.
Zod lets you define what the data should look like and validates it at runtime:

```typescript
import { z } from 'zod';

const HotelSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
});

// If the API response is missing 'name', Zod throws a clear error
const hotel = HotelSchema.parse(apiResponse);
```

This prevents mysterious bugs that happen when an API returns unexpected data.

### PostCSS

PostCSS is a tool that processes your CSS files. Mantine uses PostCSS to handle
its CSS variables (things like breakpoints for mobile/desktop). You do not
interact with PostCSS directly — it runs automatically in the background.

---

## 3. Running the Project

### First time setup

Navigate to the project folder, then install all dependencies:

```bash
cd react-learning-app
npm install
```

`npm install` reads the `package.json` file and downloads all the libraries
listed there into a folder called `node_modules`. This folder can be large
(hundreds of MB) and is never committed to git.

### Start the development server

```bash
npm run dev
```

This starts Vite's dev server. Open your browser at `http://localhost:5173`.
You should see "Hotel Finder" on the screen.

Any change you save to a file will instantly appear in the browser — no
refresh needed.

### Other commands

```bash
npm run build    # produces a production-ready bundle in the /dist folder
npm run preview  # serves the /dist folder locally to test the production build
```

---

## 4. The Project Structure

```
react-learning-app/
│
├── index.html              ← the one HTML file the browser loads
├── vite.config.ts          ← Vite + proxy configuration
├── postcss.config.cjs      ← PostCSS configuration (for Mantine CSS)
├── tsconfig.json           ← TypeScript configuration
├── package.json            ← project metadata + list of all dependencies
│
├── public/                 ← static files served as-is (favicon, images)
│
├── server/                 ← Node.js / Express backend (runs on port 3001)
│   ├── index.ts            ← Express app entry point
│   ├── data.ts             ← mock hotel data (replaces a database)
│   └── routes/
│       └── hotels.ts       ← GET /api/hotels, /api/hotels/:id, etc.
│
└── src/                    ← React frontend source code (runs on port 5173)
    ├── main.tsx            ← the entry point — the first file that runs
    └── app/
        ├── app.tsx         ← the root component, sets up all providers
        ├── query-client.ts ← React Query configuration
        └── landing/
            └── index.tsx   ← the landing page component
```

As we add features, more folders will appear inside `src/` — `results/`,
`details/`, `components/`, `hooks/`, `lib/` — but this is the foundation.

---

## 5. Core React Concepts

### 5.1 What is React?

Traditionally, a webpage is an HTML file that the browser renders. If you want
to update the page dynamically, you use JavaScript to manipulate the DOM
(Document Object Model) — the tree of HTML elements.

```javascript
// Traditional DOM manipulation
const heading = document.getElementById('title');
heading.textContent = 'New Title';
```

This works for simple cases, but becomes extremely difficult to manage as
your UI grows. Keeping the page in sync with your data becomes a full-time job.

React introduces a completely different model: **you describe what the UI
should look like for a given state of data, and React handles all the DOM
updates for you.**

React uses a "virtual DOM" — a lightweight copy of the real DOM kept in
memory. When your data changes, React calculates what changed and applies
only those specific updates to the real DOM. This is much more efficient
than re-rendering the entire page.

---

### 5.2 JSX — HTML inside JavaScript

React introduces a special syntax called JSX. It looks like HTML written
inside a JavaScript/TypeScript file:

```tsx
function MyComponent() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>This looks like HTML but it is actually JavaScript.</p>
    </div>
  );
}
```

Files that contain JSX use the `.tsx` extension (TypeScript + JSX) or `.jsx`
(JavaScript + JSX).

**JSX is not HTML.** It gets compiled to plain JavaScript by Vite before the
browser sees it. The above JSX is equivalent to:

```javascript
React.createElement('div', null,
  React.createElement('h1', null, 'Hello, World!'),
  React.createElement('p', null, 'This looks like HTML but it is actually JavaScript.')
)
```

JSX just makes it much easier to read and write.

**Key JSX rules:**
- Every component must return a single root element (or use `<>...</>` which
  is a "fragment" — an invisible wrapper with no DOM output)
- Use `className` instead of `class` (because `class` is a reserved word in JS)
- Use `{}` curly braces to embed any JavaScript expression inside JSX

```tsx
const name = 'Jay';
const isLoggedIn = true;

return (
  <div className="container">
    <h1>Hello, {name}!</h1>
    {isLoggedIn && <p>You are logged in.</p>}
    <p>2 + 2 = {2 + 2}</p>
  </div>
);
```

---

### 5.3 Components — the building blocks

A React component is just a **JavaScript/TypeScript function that returns JSX**.
That is it.

```tsx
// This is a complete React component
function WelcomeMessage() {
  return <h1>Welcome to Hotel Finder!</h1>;
}
```

Components can be used like HTML tags:

```tsx
function App() {
  return (
    <div>
      <WelcomeMessage />   {/* using our component */}
      <WelcomeMessage />   {/* can be used multiple times */}
    </div>
  );
}
```

This is the key idea of React: you build large UIs by composing small,
reusable components together. A page is a tree of components.

```
App
├── Header
│   ├── Logo
│   └── Navigation
├── SearchBar
└── HotelList
    ├── HotelCard
    ├── HotelCard
    └── HotelCard
```

---

### 5.4 Props — passing data into a component

Props (short for "properties") are how you pass data from a parent component
to a child component. They work like HTML attributes.

```tsx
// Define the shape of the props with a TypeScript type
type HotelCardProps = {
  name: string;
  price: number;
  rating: number;
};

// The component receives props as its first argument
function HotelCard({ name, price, rating }: HotelCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Price: ${price} per night</p>
      <p>Rating: {rating} / 5</p>
    </div>
  );
}

// Using it — pass data as attributes
function HotelList() {
  return (
    <div>
      <HotelCard name="Grand Plaza" price={199} rating={4.5} />
      <HotelCard name="City Inn" price={89} rating={3.8} />
    </div>
  );
}
```

Props flow in one direction: parent → child. A child cannot directly change
its parent's data.

---

### 5.5 State — data that changes over time

Props are data that comes from outside a component. **State** is data that
lives inside a component and can change.

When state changes, React automatically re-renders the component to show
the updated UI.

The `useState` hook (see next section) is how you create state:

```tsx
import { useState } from 'react';

function Counter() {
  // useState(0) creates a state variable 'count' starting at 0
  // setCount is a function to update it
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

**Important:** You must always use `setCount(...)` to update state — never
`count = count + 1` directly. React only knows to re-render when you use the
setter function.

---

### 5.6 Hooks — special React functions

Hooks are special functions that start with `use`. They let you add React
features (like state and lifecycle) to function components.

**Rules of hooks:**
1. Only call hooks at the top level of a component — never inside `if`, `for`,
   or nested functions
2. Only call hooks inside React function components (or inside other hooks)

#### `useState` — local state

```tsx
const [value, setValue] = useState(initialValue);
```

#### `useEffect` — side effects

Runs code after the component renders. Used for things like fetching data
when the page loads, setting up a timer, or subscribing to an event.

```tsx
import { useState, useEffect } from 'react';

function HotelPage() {
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    // This runs after the component first appears on screen
    fetch('https://api.example.com/hotels/1')
      .then(res => res.json())
      .then(data => setHotel(data));
  }, []); // the [] means "run this only once, on first render"

  if (!hotel) return <p>Loading...</p>;
  return <h1>{hotel.name}</h1>;
}
```

The second argument to `useEffect` is a **dependency array**:
- `[]` — runs once when the component mounts (appears on screen)
- `[userId]` — runs whenever `userId` changes
- no array — runs after every render (rarely what you want)

In practice, React Query (see section 2) replaces most `useEffect` + `fetch`
patterns with simpler code.

#### `useContext` — shared state

Lets a component read data from a "context" — a way to share data across many
components without passing props through every level. We will use this later
when we build the filter bar.

#### Custom Hooks

You can write your own hooks by extracting logic from components. If a function
starts with `use` and uses React hooks inside, it is a custom hook:

```tsx
// A custom hook that wraps the data-fetching logic
function useHotel(id: number) {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/hotels/${id}`)
      .then(res => res.json())
      .then(data => {
        setHotel(data);
        setLoading(false);
      });
  }, [id]);

  return { hotel, loading };
}

// Now any component can use it cleanly
function HotelPage({ id }: { id: number }) {
  const { hotel, loading } = useHotel(id);
  if (loading) return <p>Loading...</p>;
  return <h1>{hotel.name}</h1>;
}
```

This is exactly the pattern used in `ui-hotelhybrid` — logic is extracted into
custom hooks so it can be reused across components.

---

## 6. TypeScript in React

TypeScript adds a type system on top of JavaScript. Here are the TypeScript
concepts you will see most often in this project.

### Type annotations

```typescript
// Primitives
const name: string = 'Jay';
const age: number = 30;
const isActive: boolean = true;

// Arrays
const ids: number[] = [1, 2, 3];
const names: string[] = ['Alice', 'Bob'];

// TypeScript can usually infer the type, so you do not always need to annotate:
const score = 100; // TypeScript knows this is a number
```

### Object types

```typescript
type Hotel = {
  id: number;
  name: string;
  price: number;
  rating: number;
};

const hotel: Hotel = {
  id: 1,
  name: 'Grand Plaza',
  price: 199,
  rating: 4.5,
};
```

### Optional properties

```typescript
type SearchParams = {
  city: string;
  checkIn: string;
  checkOut: string;
  guestCount?: number; // the ? means this field is optional
};
```

### Union types — a value that can be one of several things

```typescript
type Status = 'loading' | 'success' | 'error';

function getStatusMessage(status: Status): string {
  if (status === 'loading') return 'Loading...';
  if (status === 'success') return 'Done!';
  return 'Something went wrong';
}
```

### Generics — types with parameters

You will see generics often with React Query and useState:

```typescript
// useState with a type parameter tells TypeScript what type the state holds
const [hotel, setHotel] = useState<Hotel | null>(null);

// useQuery with a type parameter tells TypeScript what the fetched data looks like
const { data } = useQuery<Hotel[]>({ queryKey: ['hotels'], queryFn: fetchHotels });
```

Think of generics like a function parameter, but for types. `useState<Hotel | null>`
means "a state variable that holds either a Hotel or null".

### Props types in React

Every component should define a type for its props:

```tsx
type ButtonProps = {
  label: string;
  onClick: () => void;              // a function that takes no args and returns nothing
  disabled?: boolean;               // optional, defaults to false
  variant?: 'primary' | 'secondary'; // can only be one of these two strings
};

function Button({ label, onClick, disabled = false, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={variant}>
      {label}
    </button>
  );
}
```

---

## 7. Understanding Every File in This Project

### 7.1 `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>react-learning-app</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

This is the only HTML file in the entire project. Notice:
- `<div id="root"></div>` — an empty container. React will inject the entire
  UI into this element.
- The `<script>` tag loads `main.tsx` — this is where React starts.

The browser loads this file, sees the empty `<div id="root">`, then runs
`main.tsx` which fills it with the React app.

---

### 7.2 `src/main.tsx`

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import { App } from './app/app';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

This is the **entry point** — the first TypeScript file that runs.

Line by line:
- `import { StrictMode } from 'react'` — StrictMode is a wrapper that helps
  catch bugs during development by intentionally running some things twice
  and warning about deprecated patterns. It has no effect in production.
- `import '@mantine/core/styles.css'` — loads all of Mantine's base styles
  globally. This must happen once, at the very top.
- `document.getElementById('root')!` — finds the `<div id="root">` in
  `index.html`. The `!` at the end is TypeScript syntax meaning "I know this
  will not be null, trust me".
- `createRoot(...).render(...)` — tells React to take control of that div
  and render `<App />` inside it.

After this runs, the empty `<div id="root">` is filled with everything the
`<App />` component returns.

---

### 7.3 `src/app/query-client.ts`

```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});
```

This creates the React Query "client" — the brain that manages all data
fetching and caching in the app.

- `staleTime: 5 * 60 * 1000` — data is considered fresh for 5 minutes. If
  a component asks for the same data again within 5 minutes, React Query
  returns the cached result instead of making a new network request.
- `retry: 1` — if a network request fails, try once more before giving up
  and showing an error.

This file creates one shared instance and exports it. The `QueryClientProvider`
in `app.tsx` makes this instance available to every component in the tree.

---

### 7.4 `src/app/app.tsx`

```tsx
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { queryClient } from './query-client';
import { LandingPage } from './landing';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
}
```

This is the **root component** — the top of the entire component tree.
Everything else in the app is a descendant of `App`.

The nested structure here is the **Provider pattern** (see section 8).

The routing section:
- `<BrowserRouter>` — enables URL-based routing for the entire app
- `<Switch>` — renders only the first `<Route>` that matches the current URL
- `<Route exact path="/">` — matches only the exact URL `/`
- `exact` matters: without it, `/` would also match `/results`, `/details`, etc.

We will add more routes as we build more pages:

```tsx
<Switch>
  <Route exact path="/">
    <LandingPage />
  </Route>
  <Route path="/results">
    <ResultsPage />       {/* coming next */}
  </Route>
  <Route path="/details/:id">
    <DetailsPage />       {/* :id is a URL parameter, e.g. /details/42 */}
  </Route>
</Switch>
```

---

### 7.5 `src/app/landing/index.tsx`

```tsx
import { Title, Text, Stack, Container } from '@mantine/core';

export function LandingPage() {
  return (
    <Container size="md" py="xl">
      <Stack align="center" gap="md">
        <Title>Hotel Finder</Title>
        <Text c="dimmed">Learning React the ui-hotelhybrid way</Text>
      </Stack>
    </Container>
  );
}
```

This is the landing page — what you see at `http://localhost:5173`.

All the components here come from Mantine:
- `<Container size="md">` — centers the content with a max-width
- `<Stack align="center" gap="md">` — stacks children vertically with
  spacing between them (`gap="md"` is a Mantine spacing token)
- `<Title>` — renders an `<h1>` with Mantine's heading styles
- `<Text c="dimmed">` — renders a `<p>` with a muted grey color
  (`c` is shorthand for `color` in Mantine's prop API)

The file is named `index.tsx`. This is a standard convention: when you write
`import { LandingPage } from './landing'`, Vite and Node automatically look
for `landing/index.tsx`. It keeps import paths short and clean.

---

## 8. The Provider Pattern Explained

Look at the nesting in `app.tsx`:

```tsx
<QueryClientProvider client={queryClient}>
  <MantineProvider>
    <BrowserRouter>
      {/* all your pages live here */}
    </BrowserRouter>
  </MantineProvider>
</QueryClientProvider>
```

This is the **Provider pattern**. Each "Provider" component puts something
into a **React Context** — a shared space that any descendant component can
read from, no matter how many levels deep it is.

**The problem it solves:** Imagine you have user login data at the top of
the tree, and a deeply nested `<UserAvatar />` component that needs it.
Without context, you would have to pass `user` as a prop through every
level in between — `App` → `Page` → `Section` → `Panel` → `UserAvatar`.
This is called "prop drilling" and it is painful to maintain.

**With providers:** The data is "broadcast" from the Provider. Any component
inside it can "tune in" by calling the corresponding hook — no matter how
deep it sits in the tree.

```
QueryClientProvider  ← broadcasts the query client
  MantineProvider    ← broadcasts the theme
    BrowserRouter    ← broadcasts the current URL
      LandingPage    ← any of these can call useQuery(), useMantineTheme(),
        Header         useHistory(), useParams() to read from the context above
          Logo
```

The three providers we have now:
- `QueryClientProvider` — any component inside can call `useQuery(...)` to
  fetch and cache data
- `MantineProvider` — all Mantine components inside will use the theme's
  colors, fonts, and spacing
- `BrowserRouter` — any component inside can call `useHistory()` to navigate
  or `useParams()` to read URL parameters

As we build the app, we will add our own custom context providers here — for
example, a filter context that makes the current search term available to
every component that needs it.

---

## 9. What is Vite?

Vite (French for "fast") is two things in one:

1. **A dev server** — serves your app locally while you are building it
2. **A build tool** — packages your app for production when you are done

These are separate jobs and Vite handles them differently. Understanding each
one will make `npm run dev` and `npm run build` much less mysterious.

---

### 9.1 The Dev Server — what happens when you run `npm run dev`

When you run `npm run dev`, Vite starts a local HTTP server on your machine
at `http://localhost:5173`. "Local" means it only runs on your own computer —
no one else on the internet can see it.

**Why do you need a server at all?**

You might think: "my code is already on my computer, why can't I just open
`index.html` by double-clicking it?" The answer is that browsers impose strict
security rules on files opened directly from the filesystem (`file://` URLs).
Importing modules, making fetch requests, and loading CSS all fail or behave
differently without a real HTTP server. Vite's dev server makes your browser
behave as if you were viewing a real website.

**How Vite serves your files — native ES modules**

Old build tools like Webpack would bundle all your files into one big JavaScript
file first, then serve it. With a large project, this bundle step could take
10–30 seconds every time you started the dev server.

Vite skips the bundle step entirely during development. Instead, it relies on
a feature that every modern browser has built in: **native ES modules**.

When the browser loads your app, it reads the `import` statements in your code
and asks for each file individually:

```
Browser:  "Give me main.tsx"
Vite:     Here it is (converted from TypeScript to JavaScript)

Browser:  "main.tsx imports './app/app'. Give me app.tsx"
Vite:     Here it is

Browser:  "app.tsx imports './landing'. Give me landing/index.tsx"
Vite:     Here it is
```

Vite only converts a file when the browser actually asks for it. On a large
project this means startup time stays under one second regardless of how many
files you have, because Vite does not pre-process files you have not opened yet.

**The TypeScript → JavaScript conversion**

Browsers cannot run TypeScript. When the browser requests `app.tsx`, Vite
converts it to plain JavaScript on the fly before sending it. This conversion
is done by a tool called **esbuild**, which is written in Go and is
extremely fast (10–100x faster than older TypeScript compilers for this task).

Importantly, esbuild only strips the TypeScript type annotations — it does not
check whether your types are correct. That job belongs to `tsc` (the TypeScript
compiler), which you run separately with `npm run build` or
`./node_modules/.bin/tsc --noEmit`.

```
Your .tsx file
      │
      │  Vite passes it to esbuild
      ▼
Stripped TypeScript and JSX converted → plain .js
      │
      │  Sent to the browser
      ▼
Browser runs it
```

---

### 9.2 Hot Module Replacement (HMR) — the magic of instant updates

When you save a changed file, Vite does not refresh the entire browser page.
Instead it uses **Hot Module Replacement (HMR)**.

Here is what happens step by step when you edit and save a component:

```
1. You save HotelCard.tsx

2. Vite's file watcher detects the change

3. Vite re-converts only that one file (takes < 5ms)

4. Vite sends a WebSocket message to the browser:
   "Hey, HotelCard.tsx changed. Here is the new version."
   (A WebSocket is a persistent two-way connection between
   Vite and the browser — it is set up when you first open the app)

5. The browser receives the new module and swaps it in memory.
   It does NOT reload the page.

6. React Fast Refresh (part of @vitejs/plugin-react) updates
   only the component that changed, preserving the state of
   every other component on the page.
```

**Why this matters:** if you have navigated to the hotel details page and are
tweaking the layout, you do not have to click through the landing page and
results page again every time you save. The page stays where it is and only
the changed component updates.

Compare this to older development workflows where every save triggered a full
page reload — you would lose all your navigation state and have to start over.

---

### 9.3 Dev mode vs Production build

Vite behaves completely differently between `npm run dev` and `npm run build`.

| | `npm run dev` | `npm run build` |
|--|--------------|----------------|
| **Goal** | Fast feedback for you | Small, fast files for users |
| **Bundling** | No bundling — files served individually | All files merged into a small number of optimised bundles |
| **Minification** | No — code is readable for debugging | Yes — all whitespace and comments stripped |
| **Source maps** | Yes — browser shows your original TypeScript | Optional |
| **Speed** | Starts instantly | Slower — full TypeScript check + bundling |
| **Output** | Served from memory | Written to the `/dist` folder |

When you deploy to a real server (e.g. AWS, Vercel), you run `npm run build`
and upload the `/dist` folder. Users never see Vite — they just receive the
optimised JavaScript files.

---

### 9.4 vite.config.ts — Vite configuration

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],       // adds JSX support and HMR for React
  server: {
    proxy: {
      '/api': 'http://localhost:3001',  // forward /api/* to Express
    },
  },
});
```

The `@vitejs/plugin-react` plugin adds two things:
- **JSX transformation** — compiles `<div>` to `React.createElement('div', ...)`
- **React Fast Refresh** — the HMR integration specific to React components

The `proxy` is explained in detail in section 13.

### 9.5 TypeScript configuration (tsconfig.app.json)

```json
{
  "compilerOptions": {
    "target": "es2023",          // compile to modern JS syntax
    "jsx": "react-jsx",          // how to handle JSX (React 17+ automatic transform)
    "noUnusedLocals": true,      // error if you declare a variable and never use it
    "noUnusedParameters": true   // error if you declare a function parameter and never use it
  }
}
```

The strict settings (`noUnusedLocals`, etc.) are intentionally turned on.
They feel strict at first but prevent a whole class of subtle bugs.

### 9.6 PostCSS configuration (postcss.config.cjs)

PostCSS runs on all CSS files automatically. The `postcss-preset-mantine`
plugin injects Mantine's CSS variables (like color tokens and breakpoints)
so that Mantine components are styled correctly. You do not need to touch
this file.

---

## 10. Node.js — JavaScript on the Server

### What is Node.js?

JavaScript was originally invented to run inside web browsers. It could only
work in Chrome, Firefox, Safari, etc. Node.js changed that.

**Node.js is a runtime that lets JavaScript run outside the browser** — on
your computer, on a server, anywhere. The same language you use to write a
React button can now also run a web server, read files from disk, connect to
a database, and respond to HTTP requests.

This is why the JavaScript ecosystem can power both the frontend (React running
in the browser) and the backend (Express running on a server) in the same
project, with shared TypeScript types.

### How Node.js works — the event loop

In most programming languages (Java, Python, etc.), when you do something slow
like reading a file or calling a database, the program waits (blocks) until
that operation completes before doing anything else.

Node.js is **non-blocking** — it does not wait. When it asks for data from a
database, it registers a callback function ("call me when it is ready") and
immediately moves on to handle other requests. When the data arrives, Node.js
runs the callback.

```javascript
// Blocking (not how Node works):
const data = readFileSynchronously('file.txt'); // waits here...
console.log(data);                              // ...then continues

// Non-blocking (how Node actually works):
readFile('file.txt', (data) => {
  console.log(data);         // runs when the file is ready
});
console.log('This runs first!'); // runs immediately
```

This makes Node.js very efficient for web servers — one Node process can handle
thousands of simultaneous connections without needing a separate thread per
connection.

### Why use Node.js with React?

In `ui-hotelhybrid` (the production app this project is based on), Node.js serves
three purposes:
1. **API proxy** — forwards requests from the browser to backend microservices,
   adding authentication headers and logging along the way
2. **Server-side rendering** — renders React HTML on the server for faster
   initial page loads
3. **Configuration gateway** — serves feature flags and environment config to
   the frontend

In this learning project, Node.js runs an Express server that provides the
hotel data our React app will display.

---

## 11. npm — The Package Manager

### What is npm?

npm stands for **Node Package Manager**. It is the tool that downloads and
manages the JavaScript libraries your project depends on.

Think of it like an App Store for code: thousands of developers have published
libraries (called "packages") that you can add to your project with a single
command, instead of writing everything from scratch.

### package.json — the project's manifest

Every JavaScript project has a `package.json` file. It is the central record
of everything about your project. Here is the one for this project, annotated:

```json
{
  "name": "react-learning-app",      // the project's name
  "version": "0.0.0",                // the project's version number
  "type": "module",                  // use ES module syntax (import/export)

  "scripts": {
    // These are shortcuts you run with "npm run <name>"
    "dev": "vite",                              // start the React frontend
    "dev:server": "tsx watch server/index.ts", // start the Express backend
    "dev:all": "concurrently ...",              // start both at once
    "build": "tsc -b && vite build"            // compile for production
  },

  "dependencies": {
    // Libraries your app needs to run in production
    "react": "^19.2.8",
    "express": "^5.2.1",
    "zod": "^4.4.3"
    // ...etc
  },

  "devDependencies": {
    // Libraries only needed during development (not shipped to users)
    "typescript": "~6.0.2",    // the TypeScript compiler
    "vite": "^8.2.0",          // the build tool
    "tsx": "^4.23.12",         // runs TypeScript files directly in Node
    "concurrently": "^10.0.5"  // runs multiple npm scripts simultaneously
  }
}
```

### The difference between dependencies and devDependencies

- `dependencies` — libraries your app needs to actually run. If a user opens
  your website, this code runs in their browser or your server.
- `devDependencies` — tools only needed while you are developing. TypeScript,
  Vite, test runners — none of these are needed by end users.

When you deploy to a server, you install only `dependencies` (with
`npm install --production`), keeping the server lean.

### Version numbers — what ^ and ~ mean

```json
"react": "^19.2.8"   // ^ means: any version >= 19.2.8 but < 20.0.0
"typescript": "~6.0.2"  // ~ means: any version >= 6.0.2 but < 6.1.0
```

This controls how much flexibility npm has when picking versions. `^` is
more permissive (allows minor updates), `~` is stricter (allows only
patch fixes).

### node_modules — where packages live

When you run `npm install`, it:
1. Reads `package.json`
2. Downloads every listed package from the npm registry (registry.npmjs.org)
3. Saves them all to a `node_modules/` folder

`node_modules/` can contain hundreds of packages and grow to several hundred
MB. It is never committed to git — instead, anyone who clones the project
just runs `npm install` to rebuild it from `package.json`.

### package-lock.json — the exact version lock

`package.json` says "give me React version 19.x". But `package-lock.json`
records the exact version actually installed, along with the exact versions
of every sub-dependency of every package. This ensures that everyone working
on the project — and the production server — installs the identical set of
packages, down to the patch version.

**Always commit `package-lock.json` to git.** Never commit `node_modules/`.

### Common npm commands

```bash
npm install                     # install all packages from package.json
npm install <package>           # add a new package to dependencies
npm install --save-dev <package> # add a new package to devDependencies
npm uninstall <package>         # remove a package
npm run dev                     # run the "dev" script from package.json
npm run dev:server              # run the "dev:server" script
npm run dev:all                 # run both frontend and backend simultaneously
npm run build                   # run the "build" script
```

---

## 12. Express — The Web Server

### What is Express?

Express is a minimal web framework for Node.js. It makes it straightforward
to:
- Listen for HTTP requests (GET, POST, PUT, DELETE)
- Route requests to the right handler based on the URL
- Read data from the request (body, query parameters, URL parameters)
- Send a response (JSON, HTML, files)

### HTTP — the language of the web

Before diving into Express, it helps to understand HTTP. Every time a browser
loads a page or a React app fetches data, it sends an **HTTP request**. The
server receives it and sends back an **HTTP response**.

An HTTP request has:
- A **method** — what kind of action: GET (read), POST (create), PUT (update),
  DELETE (remove)
- A **URL** — what resource: `/api/hotels`, `/api/hotels/3`
- Optionally a **body** — data sent with the request (for POST/PUT)
- **Headers** — metadata like content type, auth tokens

An HTTP response has:
- A **status code** — 200 (OK), 404 (not found), 500 (server error)
- A **body** — the data being returned, usually JSON

### REST API — a convention for designing URLs

REST (Representational State Transfer) is a widely followed convention for
designing API URLs. This project follows it:

```
GET  /api/hotels         → get a list of all hotels
GET  /api/hotels/3       → get hotel with id = 3
GET  /api/hotels/3/reviews → get all reviews for hotel 3
POST /api/hotels         → create a new hotel (not implemented yet)
PUT  /api/hotels/3       → update hotel 3 (not implemented yet)
DELETE /api/hotels/3     → delete hotel 3 (not implemented yet)
```

### Express concepts

#### Application

```typescript
import express from 'express';
const app = express(); // creates the Express application
```

#### Middleware

Middleware is a function that runs on every request before it reaches your
route handler. It can inspect or modify the request and response.

```typescript
// This middleware tells Express to parse JSON request bodies
app.use(express.json());

// You can write your own middleware:
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`); // log every request
  next(); // pass control to the next middleware or route handler
});
```

Middleware runs in order, from top to bottom. Always call `next()` unless you
intend to send a response yourself.

#### Routes

A route defines what to do when a specific URL and method is requested:

```typescript
// When the browser does GET /api/hotels, run this function
app.get('/api/hotels', (req, res) => {
  res.json([{ id: 1, name: 'Grand Plaza' }]);
});

// URL parameters — :id is a placeholder for any value
app.get('/api/hotels/:id', (req, res) => {
  const id = parseInt(req.params.id); // read the :id from the URL
  const hotel = findHotelById(id);
  
  if (!hotel) {
    return res.status(404).json({ error: 'Hotel not found' });
  }
  
  res.json(hotel);
});
```

The function `(req, res) => {...}` is called the **route handler**:
- `req` (request) — contains everything about the incoming request:
  - `req.params` — URL parameters like `:id`
  - `req.query` — query string parameters like `?city=Miami`
  - `req.body` — the request body (for POST/PUT)
- `res` (response) — methods to send back a response:
  - `res.json(data)` — send JSON with status 200
  - `res.status(404).json(...)` — send JSON with a specific status code
  - `res.send('text')` — send plain text

#### Routers

Instead of defining all routes in one file, Express lets you group related
routes into a `Router` and mount it at a URL prefix:

```typescript
// In routes/hotels.ts
import { Router } from 'express';
export const hotelsRouter = Router();

hotelsRouter.get('/', ...)          // handles GET /api/hotels
hotelsRouter.get('/:id', ...)       // handles GET /api/hotels/:id

// In index.ts
app.use('/api/hotels', hotelsRouter); // mount at /api/hotels
```

This keeps the code organized — exactly the pattern used in `ui-hotelhybrid`.

#### Listening for requests

```typescript
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

`listen` starts the server. Port 3001 means the server is accessible at
`http://localhost:3001`. (Port 80 is the default for HTTP, but you need root
permissions to use it in development, so 3001 or 8080 are common choices.)

---

## 13. Client and Server Working Together

This project has two separate processes running during development:

```
Browser ─── http://localhost:5173 ──► Vite dev server (React frontend)
                                              │
                                   /api/* requests are proxied
                                              │
                                              ▼
                              http://localhost:3001 ──► Express (Node.js backend)
```

### The proxy

During development, the React app (running on port 5173) needs to talk to
the Express server (running on port 3001). Browsers block cross-origin requests
by default (this is called CORS — Cross-Origin Resource Sharing). To avoid
this complication in development, Vite is configured as a **proxy**:

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': 'http://localhost:3001',
  },
},
```

This means: any request your React app makes to a URL starting with `/api`
is automatically forwarded to `http://localhost:3001`. From the React app's
perspective, it is talking to itself. No CORS issues.

```typescript
// In a React component, this fetch call:
fetch('/api/hotels')

// Vite intercepts it and sends it to:
// http://localhost:3001/api/hotels
```

### How a request flows end to end

Here is what happens when the React app loads the hotel list:

```
1. React component calls useQuery({ queryFn: () => fetch('/api/hotels') })

2. React Query checks its cache — nothing there yet

3. React Query calls the queryFn, which sends:
   GET http://localhost:5173/api/hotels

4. Vite dev server sees /api/... and proxies it to:
   GET http://localhost:3001/api/hotels

5. Express receives the request, matches it to the GET /api/hotels route

6. The route handler reads from data.ts and sends back:
   HTTP 200
   Content-Type: application/json
   [{"id":1,"name":"Grand Plaza Hotel",...}, ...]

7. Vite forwards the response back to the browser

8. React Query stores the data in its cache

9. The component re-renders with the hotel list displayed
```

### `npm run dev:all` — running both servers at once

#### What `npm run` does

`npm run` is a command that reads the `scripts` section of `package.json` and
runs the matching entry. It is just a shortcut so you do not have to remember
or type long commands.

```json
// package.json
"scripts": {
  "dev":        "vite",
  "dev:server": "tsx watch server/index.ts",
  "dev:all":    "concurrently \"npm run dev\" \"npm run dev:server\""
}
```

So:
- `npm run dev` → actually runs `vite`
- `npm run dev:server` → actually runs `tsx watch server/index.ts`
- `npm run dev:all` → actually runs `concurrently "npm run dev" "npm run dev:server"`

You could type the full command yourself instead — `npm run` is purely
for convenience.

#### What a "process" is

A process is a running program. Every time you run a command in the terminal,
the operating system creates a new process for it. Processes are isolated from
each other — they have separate memory and cannot interfere with each other.

When you run `npm run dev`, it creates one process: the Vite dev server.
That process keeps running (it does not exit) and listens for browser requests
on port 5173.

When you run `npm run dev:server`, it creates another process: the Express
server. That process keeps running and listens on port 3001.

These two processes are completely independent. You need both running at the
same time — Vite serves the React app, Express serves the API data.

**What happens if only one is running:**

| Situation | What breaks |
|-----------|-------------|
| Only Vite running (no Express) | App loads, but clicking "Browse Hotels" shows an error — fetch('/api/hotels') gets a 502 Bad Gateway because there is nothing on port 3001 |
| Only Express running (no Vite) | You can call the API with curl, but there is no React app to open in the browser |
| Both running | Everything works |

#### What `concurrently` does

Normally you can only run one command at a time in a terminal. When you run
`vite`, the terminal is occupied — you cannot type another command until Vite
exits.

`concurrently` is a small npm library that starts multiple commands at once
and merges their output into one terminal window. It is the equivalent of
opening two separate terminal tabs and running one command in each.

```bash
# This runs BOTH at the same time in one terminal:
npm run dev:all

# Same result, but requires two separate terminal windows:
# Terminal 1:
npm run dev:server

# Terminal 2:
npm run dev
```

#### What you see in the terminal

When you run `npm run dev:all`, `concurrently` prefixes each line with a colour
and a number so you can tell which process produced which output:

```
[0] Server running at http://localhost:3001   ← from Express (process 0)
[0] Try: http://localhost:3001/api/hotels
[1]                                           ← from Vite (process 1)
[1]   VITE v8.2.0  ready in 312 ms
[1]
[1]   ➜  Local:   http://localhost:5173/
[1]   ➜  Network: use --host to expose
```

Lines prefixed `[0]` come from Express. Lines prefixed `[1]` come from Vite.

When you save a React file, Vite prints an update:

```
[1]   page reload src/app/results/index.tsx (hot)
```

When a browser hits the Express API, you can add a console.log in a route
handler and it will appear with `[0]`.

#### `tsx watch` — how the Express server auto-restarts

`npm run dev:server` runs `tsx watch server/index.ts`.

`tsx` is a tool that runs TypeScript files directly in Node.js (no separate
compile step). The `watch` flag tells it to watch for file changes — if you
edit any file in the `server/` folder, `tsx` automatically restarts the
Express server with the new code.

This means both sides hot-reload on save:
- Edit a React component → Vite updates the browser instantly (no page reload)
- Edit an Express route → tsx restarts the server in under a second

---

## 14. Understanding the Server Files

### 14.1 `server/index.ts`

```typescript
import express from 'express';
import { hotelsRouter } from './routes/hotels';

const app = express();
const PORT = 3001;

app.use(express.json());              // middleware: parse JSON bodies
app.use('/api/hotels', hotelsRouter); // mount the hotels router

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });         // simple health-check endpoint
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

This is the entry point for the Node.js server. It:
1. Creates the Express app
2. Adds JSON parsing middleware
3. Mounts the hotels router at `/api/hotels`
4. Starts listening on port 3001

Note `_req` — the underscore prefix is a TypeScript convention meaning "this
parameter exists but I intentionally do not use it".

---

### 14.2 `server/data.ts`

This file holds the in-memory mock data — TypeScript types (`Hotel`, `Review`)
and two arrays of objects. In a real application, this data would come from a
database (PostgreSQL, MongoDB, etc.). For learning, hardcoded data is perfect
because it removes all database setup complexity.

The TypeScript types here can be imported by the frontend too, so both sides
share the same data shape — no duplication.

---

### 14.3 `server/routes/hotels.ts`

```typescript
import { Router } from 'express';
import { hotels, reviews } from '../data';

export const hotelsRouter = Router();

// GET /api/hotels
hotelsRouter.get('/', (req, res) => {
  const { city } = req.query; // read ?city=Miami from the URL

  if (city && typeof city === 'string') {
    const filtered = hotels.filter(h =>
      h.city.toLowerCase().includes(city.toLowerCase())
    );
    return res.json(filtered);
  }

  res.json(hotels); // return all if no filter
});

// GET /api/hotels/:id
hotelsRouter.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const hotel = hotels.find(h => h.id === id);

  if (!hotel) {
    return res.status(404).json({ error: `Hotel with id ${id} not found` });
  }

  res.json(hotel);
});

// GET /api/hotels/:id/reviews
hotelsRouter.get('/:id/reviews', (req, res) => {
  const id = parseInt(req.params.id);
  const hotelReviews = reviews.filter(r => r.hotelId === id);
  res.json(hotelReviews);
});
```

Three endpoints, each handling a different URL. Try them in your browser or
with `curl` while the server is running:

```bash
# All hotels
curl http://localhost:3001/api/hotels

# Filter by city
curl "http://localhost:3001/api/hotels?city=Miami"

# One hotel
curl http://localhost:3001/api/hotels/1

# Hotel's reviews
curl http://localhost:3001/api/hotels/1/reviews
```

---

## 15. The Full Request-Response Journey

This section traces exactly what happens when you click "Browse Hotels" on the
landing page and the hotel list appears on screen. Every single step is shown,
from the mouse click to the painted UI.

---

### 15.1 The Hardcoded Server Response

The Express server in `server/routes/hotels.ts` does not talk to a database.
It returns hardcoded JSON from `server/data.ts`. Here is the exact JSON the
server sends when `GET /api/hotels` is called:

```json
[
  {
    "id": 1,
    "name": "Grand Plaza Hotel",
    "city": "New York",
    "price": 299,
    "rating": 4.8,
    "description": "Luxury hotel in the heart of midtown Manhattan with stunning city views."
  },
  {
    "id": 2,
    "name": "City Inn",
    "city": "Los Angeles",
    "price": 149,
    "rating": 3.9,
    "description": "Comfortable and affordable hotel near downtown LA."
  },
  {
    "id": 3,
    "name": "Sunset Bay Resort",
    "city": "Miami",
    "price": 249,
    "rating": 4.5,
    "description": "Beachfront resort with private beach access and ocean views."
  }
]
```

This is a **JSON array** — a list of hotel objects, each with the same set of
fields. JSON (JavaScript Object Notation) is the universal language that
servers and clients use to exchange data on the web. It looks almost identical
to a JavaScript object, with two differences: keys must be in double quotes,
and it cannot contain functions.

You can see this response yourself right now by visiting:
`http://localhost:3001/api/hotels`

---

### 15.2 The Complete Flow, Step by Step

Here is the full journey. Read it top to bottom — every arrow is a real thing
that happens in real time when you click the button.

```
┌─────────────────────────────────────────────────────────────────────────┐
│  BROWSER (what the user sees)                                           │
│                                                                         │
│  User clicks "Browse Hotels" button                                     │
└───────────────────────────┬─────────────────────────────────────────────┘
                            │ Step 1: onClick fires
                            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  REACT ROUTER                                                           │
│                                                                         │
│  history.push('/results') is called                                     │
│  React Router sees the URL changed to /results                          │
│  It looks at the <Switch> and finds <Route path="/results">             │
│  It unmounts <LandingPage /> and mounts <ResultsPage />                 │
└───────────────────────────┬─────────────────────────────────────────────┘
                            │ Step 2: ResultsPage renders for the first time
                            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  REACT (rendering ResultsPage)                                          │
│                                                                         │
│  React runs the ResultsPage function.                                   │
│  It hits this line:                                                     │
│    const { data, isLoading, isError } = useQuery({                      │
│      queryKey: ['hotels'],                                              │
│      queryFn: fetchHotels,                                              │
│    });                                                                  │
│                                                                         │
│  React Query checks its cache for the key ['hotels'].                   │
│  Cache is empty (first visit). So it sets isLoading = true.            │
│  It schedules fetchHotels() to run after the render.                    │
│                                                                         │
│  React sees if (isLoading) return <Loader />                            │
│  React paints the spinner on screen.                                    │
└───────────────────────────┬─────────────────────────────────────────────┘
                            │ Step 3: React Query calls fetchHotels()
                            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  FETCH API (inside the browser)                                         │
│                                                                         │
│  fetchHotels() runs:                                                    │
│    const response = await fetch('/api/hotels');                         │
│                                                                         │
│  The browser prepares an HTTP request:                                  │
│    Method:  GET                                                         │
│    URL:     http://localhost:5173/api/hotels                            │
│    Headers: (standard browser headers)                                  │
└───────────────────────────┬─────────────────────────────────────────────┘
                            │ Step 4: HTTP request leaves the browser
                            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  VITE DEV SERVER (port 5173)                                            │
│                                                                         │
│  Vite sees the request is for /api/...                                  │
│  It checks vite.config.ts:                                              │
│    proxy: { '/api': 'http://localhost:3001' }                           │
│                                                                         │
│  Vite transparently forwards the request to Express:                    │
│    GET http://localhost:3001/api/hotels                                 │
└───────────────────────────┬─────────────────────────────────────────────┘
                            │ Step 5: Request arrives at Express
                            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  EXPRESS SERVER (port 3001)                                             │
│                                                                         │
│  Express receives: GET /api/hotels                                      │
│                                                                         │
│  It matches this route in server/routes/hotels.ts:                      │
│    hotelsRouter.get('/', (req, res) => { ... })                         │
│                                                                         │
│  The handler runs:                                                      │
│    1. req.query has no 'city' param, so no filtering                    │
│    2. res.json(hotels) is called                                        │
│                                                                         │
│  Express serializes the hotels array to a JSON string and sends:        │
│    HTTP/1.1 200 OK                                                      │
│    Content-Type: application/json                                       │
│    Body: [{"id":1,"name":"Grand Plaza Hotel",...}, ...]                 │
└───────────────────────────┬─────────────────────────────────────────────┘
                            │ Step 6: Response travels back
                            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  VITE DEV SERVER (acting as proxy)                                      │
│                                                                         │
│  Vite receives the Express response and forwards it to the browser.     │
│  From the browser's perspective, it was talking to localhost:5173       │
│  all along — it never saw port 3001.                                    │
└───────────────────────────┬─────────────────────────────────────────────┘
                            │ Step 7: Response arrives in the browser
                            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  FETCH API (back inside the browser)                                    │
│                                                                         │
│  await fetch('/api/hotels') resolves with a Response object.            │
│                                                                         │
│  fetchHotels() continues:                                               │
│    if (!response.ok)  →  response.ok is true (status 200), skip        │
│    return response.json()                                               │
│                                                                         │
│  response.json() reads the body text and parses it:                     │
│    '[{"id":1,...}]'  →  [ { id: 1, name: "Grand Plaza Hotel", ... } ]  │
│                                                                         │
│  fetchHotels() returns the JavaScript array.                            │
└───────────────────────────┬─────────────────────────────────────────────┘
                            │ Step 8: React Query receives the data
                            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  REACT QUERY (cache layer)                                              │
│                                                                         │
│  React Query receives the Hotel[] array from fetchHotels().             │
│                                                                         │
│  It stores it in its in-memory cache under the key ['hotels'].          │
│  It marks the query as: status = 'success', isLoading = false.          │
│  It sets data = [ { id: 1, ... }, { id: 2, ... }, ... ]                │
│                                                                         │
│  React Query then triggers a re-render of ResultsPage.                  │
└───────────────────────────┬─────────────────────────────────────────────┘
                            │ Step 9: ResultsPage re-renders
                            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  REACT (re-rendering ResultsPage)                                       │
│                                                                         │
│  React runs the ResultsPage function again.                             │
│  This time:                                                             │
│    isLoading = false   →  skip the <Loader />                           │
│    isError = false     →  skip the <Alert />                            │
│    data = [6 hotels]   →  reach the hotels?.map(...) section            │
│                                                                         │
│  React builds a list of <Card> elements, one per hotel.                 │
│  It compares this new output with the previous output (the spinner).    │
│  It removes the spinner and inserts the 6 hotel cards.                  │
└───────────────────────────┬─────────────────────────────────────────────┘
                            │ Step 10: Browser paints the result
                            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  BROWSER (what the user sees)                                           │
│                                                                         │
│  The spinner disappears.                                                │
│  6 hotel cards appear on screen with names, cities, prices, ratings.   │
│                                                                         │
│  Total time from click to painted list: typically 5–50 milliseconds.   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 15.3 What React Does at Each Stage

The key thing to understand is that **React re-renders the component multiple
times** during this flow. Re-rendering means React calls the `ResultsPage`
function again from the top.

| Render # | Trigger | isLoading | data | What appears on screen |
|----------|---------|-----------|------|------------------------|
| 1st render | Component mounts (URL changes to /results) | `true` | `undefined` | Spinner |
| 2nd render | React Query gets data back | `false` | `Hotel[]` | Hotel cards |

Each time React re-renders, it runs the entire function body again, checks
the `if` conditions, and builds the JSX output. React then compares that output
to the previous output and makes the minimal changes to the real DOM.

This is what it means that React is **declarative**: you do not write "remove
the spinner, add a card". You just write "if loading, show spinner; otherwise
show cards" — and React figures out the DOM changes needed to get there.

---

### 15.4 Reading the Results Page Code

Here is the full `src/app/results/index.tsx` annotated alongside the flow above:

```tsx
// ── STEP 1: TypeScript type ──────────────────────────────────────────────
// Tells TypeScript the exact shape of each hotel object.
// Must match what Express sends in its JSON.
type Hotel = {
  id: number;
  name: string;
  city: string;
  price: number;
  rating: number;
  description: string;
};

// ── STEP 3–7: The fetch function ────────────────────────────────────────
// A plain async function. React Query will call this.
// 'async' means it can use 'await' to wait for things.
// Promise<Hotel[]> means "this eventually returns an array of Hotel objects"
async function fetchHotels(): Promise<Hotel[]> {

  // fetch() is built into the browser. It sends an HTTP GET request.
  // '/api/hotels' is the URL. Vite's proxy forwards it to Express.
  // 'await' pauses this function until the response arrives — but does NOT
  // block the rest of the browser. The UI stays responsive.
  const response = await fetch('/api/hotels');

  // 200 = OK, 404 = not found, 500 = server error
  // fetch() does NOT throw on 404/500 — we check manually.
  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  // .json() reads the response body text and parses it.
  // This is also async — the body might arrive in chunks.
  return response.json() as Promise<Hotel[]>;
}

// ── STEP 2 and 9: The component ─────────────────────────────────────────
export function ResultsPage() {

  // useQuery does the orchestration:
  //   - Calls fetchHotels() on mount
  //   - Gives us isLoading, isError, data to branch on
  //   - Caches the result under the key ['hotels']
  const { data: hotels, isLoading, isError, error } = useQuery({
    queryKey: ['hotels'],
    queryFn: fetchHotels,
  });

  // ── 1st render: isLoading is true ─────────────────────────────────────
  // React returns early here. The rest of the function does not run.
  if (isLoading) {
    return <Loader />;
  }

  // ── If fetch threw an error ────────────────────────────────────────────
  if (isError) {
    return <Alert color="red">{error.message}</Alert>;
  }

  // ── 2nd render: data has arrived ──────────────────────────────────────
  // hotels is now the Hotel[] array the server returned.
  return (
    <Container size="md" py="xl">
      <Title mb="md">Available Hotels</Title>

      <Stack gap="md">
        {/*
          .map() loops through the array and returns one <Card> per hotel.
          
          key={hotel.id} — required by React on any list. React uses it
          to match elements between renders. Without it, React cannot
          efficiently update the list when items are added/removed.
        */}
        {hotels?.map(hotel => (
          <Card key={hotel.id} shadow="sm" padding="lg" withBorder>
            <Text fw={700}>{hotel.name}</Text>
            <Text c="dimmed">{hotel.city}</Text>
            <Text>${hotel.price} / night · ★ {hotel.rating}</Text>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
```

### Key concepts in this code

**`async` / `await`**

`async` and `await` are how JavaScript handles things that take time (like
network requests) without freezing the browser.

```javascript
// Without async/await (older style using .then() chains)
fetch('/api/hotels')
  .then(response => response.json())
  .then(data => console.log(data));

// With async/await (cleaner, same thing)
async function load() {
  const response = await fetch('/api/hotels');
  const data = await response.json();
  console.log(data);
}
```

`await` means "pause this function here and wait for the Promise to resolve,
but let the rest of the browser continue running". It is not a real pause —
the user can still click buttons while `fetch` is waiting for the server.

**React Query's three states**

Every `useQuery` call returns an object with three key properties:

```tsx
const { data, isLoading, isError } = useQuery({ ... });

//  isLoading   isError   data
//  ─────────   ───────   ────────────────────────────────────
//  true        false     undefined     ← fetch in progress
//  false       true      undefined     ← fetch failed
//  false       false     Hotel[]       ← fetch succeeded
```

Your component must handle all three cases. If you try to use `data` while
`isLoading` is true, it will be `undefined` and you will get a runtime error.
That is why the `if (isLoading)` and `if (isError)` checks come first.

**The `key` prop in lists**

When React renders a list with `.map()`, it needs to track each item across
re-renders. Without a `key`, if you add a hotel at the top of the list, React
cannot tell whether the existing items shifted down or new ones appeared. It
would re-render every card unnecessarily.

```tsx
// Bad — React cannot track individual items
hotels.map(hotel => <Card>...</Card>)

// Good — React knows exactly which card is which
hotels.map(hotel => <Card key={hotel.id}>...</Card>)
```

Always use a stable, unique value as the key — usually the database `id`.
Never use the array index as a key (it breaks when the list is reordered).

---

## 16. How the Landing Page Loads — End to End

This section traces every single thing that happens from the moment you type
`npm run dev` in the terminal to the moment "Hotel Finder.." appears on screen.

---

### Step 1 — You type `npm run dev`

```bash
npm run dev
```

`npm` opens `package.json` and reads the `scripts` section:

```json
"scripts": {
  "dev": "vite",
  ...
}
```

`npm run dev` is just a shortcut — it actually runs the command `vite`. npm
finds the `vite` executable inside `node_modules/.bin/vite` and runs it. This
starts a new **process** (a running program) on your machine.

---

### Step 2 — Vite starts up

Vite reads `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],   // adds React/JSX support and HMR
  server: {
    proxy: { '/api': 'http://localhost:3001' }
  },
});
```

Then Vite does three things:
1. Starts an **HTTP server** listening on port `5173`
2. Sets up a **file watcher** — it monitors every `.tsx/.ts/.css` file for changes
3. Opens a **WebSocket channel** — used later for hot reloading

Your terminal prints:
```
  VITE v8.x  ready in 312 ms
  ➜  Local: http://localhost:5173/
```

Vite is now waiting. No files have been compiled yet — Vite is lazy and only
processes a file when the browser actually asks for it.

---

### Step 3 — You open `http://localhost:5173` in the browser

The browser sends this HTTP request to Vite:

```
GET / HTTP/1.1
Host: localhost:5173
```

Vite receives it, sees the path is `/`, and responds with the contents of
`index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>react-learning-app</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

The browser paints a **blank white page** at this point. The `<div id="root">`
is empty. But the browser then sees the `<script>` tag and knows it has more
work to do.

---

### Step 4 — Browser requests `main.tsx`

The browser sends another request:

```
GET /src/main.tsx
```

Vite opens `src/main.tsx`, runs **esbuild** on it — stripping TypeScript types
and converting JSX to plain JavaScript — and sends the result back.

The browser starts reading `main.tsx` and hits its `import` lines:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import { App } from './app/app';
```

Every `import` line causes the browser to **pause and send another request**
to Vite:

```
GET /node_modules/react/...         ← the React library
GET /node_modules/react-dom/...     ← the ReactDOM library
GET /@mantine/core/styles.css       ← Mantine's stylesheet (applied globally)
GET /src/app/app.tsx                ← your App component
```

---

### Step 5 — The import chain fans out

When Vite serves `app.tsx`, the browser reads its imports:

```tsx
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { queryClient } from './query-client';
import { LandingPage } from './landing';
import { ResultsPage } from './results';
```

Each one triggers more requests:

```
GET /src/app/query-client.ts
GET /src/app/landing/index.tsx
GET /src/app/results/index.tsx
GET /node_modules/react-router-dom/...
GET /node_modules/@tanstack/react-query/...
GET /node_modules/@mantine/core/...
```

This is the **native ES module** system at work — the browser resolves imports
like a chain, requesting each file as it discovers it. Vite converts each
TypeScript/JSX file on the fly and sends it back.

Once every import is resolved and every file has arrived, the browser has
everything it needs to actually execute the code.

---

### Step 6 — `main.tsx` code runs

Now the browser executes `src/main.tsx`:

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Line by line:

- `document.getElementById('root')` — finds the `<div id="root">` in the HTML.
  It is still empty at this point.
- `createRoot(...)` — React takes ownership of that div. From here on, React
  controls everything inside it.
- `.render(<StrictMode><App /></StrictMode>)` — React is told to render the
  `<App />` component inside that div.

React now calls the `App` function.

---

### Step 7 — React renders `App`

`src/app/app.tsx`:

```tsx
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/results">
              <ResultsPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
}
```

React processes this JSX from the **outside in**, setting up each Provider:

1. **`QueryClientProvider`** — creates a React Context and puts the `queryClient`
   object into it. Any component inside can now call `useQuery()`.

2. **`MantineProvider`** — creates a theme Context. All Mantine components inside
   read from it for colours, fonts, and spacing.

3. **`BrowserRouter`** — reads `window.location.pathname`. The current URL is `/`.
   It creates a routing Context and broadcasts the current location to everything
   inside.

4. **`Switch`** — examines its `<Route>` children one by one:
   - `<Route exact path="/">` — does `/` match `/`? **Yes.** Stop here, render this.
   - `<Route path="/results">` — never even checked. `Switch` stops at the first match.

5. React renders `<LandingPage />`.

---

### Step 8 — React renders `LandingPage`

`src/app/landing/index.tsx`:

```tsx
export function LandingPage() {
  const history = useHistory();

  return (
    <Container size="md" py="xl">
      <Stack align="center" gap="md">
        <Title>Hotel Finder..</Title>
        <Text c="dimmed">Learning React the ui-hotelhybrid way</Text>
        <Button size="lg" mt="md" onClick={() => history.push('/results')}>
          Browse Hotels
        </Button>
      </Stack>
    </Container>
  );
}
```

- **`useHistory()`** — reads from the BrowserRouter Context that was set up in
  Step 7. Returns a `history` object you can use to change the URL. No network
  request — just reading from an in-memory Context.

- The JSX returns Mantine components. Each one (`Container`, `Stack`, `Title`,
  `Text`, `Button`) reads from the MantineProvider Context to get the correct
  styles and theme values.

React converts this JSX into real **DOM nodes** — actual HTML elements:

```html
<div class="mantine-Container-root">
  <div class="mantine-Stack-root">
    <h2 class="mantine-Title-root">Hotel Finder..</h2>
    <p  class="mantine-Text-root">Learning React the ui-hotelhybrid way</p>
    <button class="mantine-Button-root">Browse Hotels</button>
  </div>
</div>
```

React inserts all of this into the `<div id="root">` — the one that was empty
since Step 3.

---

### Step 9 — Browser paints the screen

The browser sees the DOM has been populated. It:
1. Calculates the **layout** — positions and sizes of every element
2. Applies **CSS** from Mantine's stylesheet (loaded in Step 4)
3. **Paints pixels** on screen

**You see "Hotel Finder.." on the screen.**

The whole journey from browser request to painted page takes roughly
200–400 milliseconds on first load — most of that is the import chain in
Step 5. On subsequent file saves, only changed modules are swapped in
(Hot Module Replacement) and the update takes under 50 milliseconds.

---

### The full picture

```
npm run dev
    │
    ▼
Vite starts → HTTP server on :5173, file watcher ready, WebSocket open
    │
    ▼  (you open the browser)
GET /  →  index.html  →  blank page + <script src="main.tsx">
    │
    ▼
GET /src/main.tsx  →  Vite converts TS→JS  →  browser starts executing
    │
    ▼  (import chain)
GET app.tsx, query-client.ts, landing/index.tsx, react, mantine, router...
Each file: Vite converts → browser receives → browser executes
    │
    ▼  (all imports resolved)
createRoot(div#root).render(<App />)
    │
    ▼
React calls App()
  → QueryClientProvider sets up query cache context
  → MantineProvider sets up theme context
  → BrowserRouter reads URL "/" and sets up routing context
  → Switch finds matching Route for "/"
  → React calls LandingPage()
    │
    ▼
LandingPage runs
  → useHistory() reads routing context (no network request)
  → returns JSX: Container > Stack > [Title, Text, Button]
    │
    ▼
React converts JSX → real DOM nodes → injected into <div id="root">
    │
    ▼
Browser calculates layout → applies CSS → paints pixels
    │
    ▼
"Hotel Finder.." appears on screen ✓
```

---

## 17. What We Will Build Next

The app is currently just a landing page with a running Express backend.
Here is the planned build order:

| Step | What we build | New concepts |
|------|--------------|--------------|
| 1 | Results page with hotel list | New route, `useQuery`, fetching from Express |
| 2 | Hotel card component | Props, component reuse |
| 3 | CSS Modules for styling | Scoped CSS, `*.module.css` |
| 4 | Search filter bar | `useState`, controlled inputs, query params |
| 5 | Filter context | `useReducer`, `useContext`, custom Provider |
| 6 | Hotel details page | URL params, `useParams`, nested queries |
| 7 | Zod validation | Validating API response shapes at runtime |
| 8 | Custom hook | Extracting shared logic into `useHotels()` |

Each step adds one concept at a time on top of what came before.

---

## Quick Reference

### Starting everything (frontend + backend)
```bash
npm run dev:all
```

### Starting just the React frontend
```bash
npm run dev
```

### Starting just the Express backend
```bash
npm run dev:server
```

### Test the API directly
```bash
curl http://localhost:3001/api/hotels
curl http://localhost:3001/api/hotels/1
curl http://localhost:3001/api/hotels/1/reviews
curl "http://localhost:3001/api/hotels?city=Miami"
```

### TypeScript check without starting the browser
```bash
./node_modules/.bin/tsc --noEmit
```

### Adding a new library
```bash
npm install <package-name>
npm install --save-dev <package-name>   # for dev-only tools (linters, test runners)
```

### File extensions cheat sheet
| Extension | Meaning |
|-----------|---------|
| `.ts` | TypeScript (logic only, no JSX) |
| `.tsx` | TypeScript with JSX (React components) |
| `.css` | Plain CSS, applied globally |
| `.module.css` | CSS Modules — styles are scoped to one component only |
