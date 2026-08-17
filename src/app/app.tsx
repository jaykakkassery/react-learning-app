import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { queryClient } from './query-client';
import { LandingPage } from './landing';
import { ResultsPage } from './results';

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
