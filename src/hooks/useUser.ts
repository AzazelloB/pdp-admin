import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { auth } from 'utils/auth';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);

    return unsubscribe;
  }, []);

  return user;
};
