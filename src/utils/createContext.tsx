import React from 'react';

type StateHook<P, T extends object> = (props: P) => T;

class ContextOutOfProvider<P, T extends object> extends Error {
  constructor(f: StateHook<P, T>) {
    const fName = f.name.replace(/^use(\w)(\w+)state$/i, (_, firstLetter, rest) => firstLetter.toUpperCase() + rest);
    const message = `'use${fName}Context' must be used within '${fName}Provider'`;

    super(message);
  }
}

/** Naming convention for stateCreators is `use[StateName]state` */
export function createContext<P, T extends object>(stateCreator: StateHook<P, T>) {
  const Context = React.createContext<ReturnType<StateHook<P, T>> | undefined>(undefined);

  const Provider = ({ children, ...props } : { children: React.ReactNode } & P) => (
    <Context.Provider value={stateCreator(props as unknown as P)}>
      { children }
    </Context.Provider>
  );

  const useContext = () => {
    const context = React.useContext(Context);

    if (context === undefined) {
      throw new ContextOutOfProvider(stateCreator);
    }

    return context;
  };

  return [Provider, useContext] as const;
}
