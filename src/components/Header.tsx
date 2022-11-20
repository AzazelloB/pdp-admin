import {
  AppBar,
  Container,
  Typography,
  Box,
  Button,
  MenuItem,
  Menu,
  IconButton,
  Avatar,
} from '@mui/material';
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyDhMsgutQw1q6VQ7A8I27C8k9J6Zp6ryZo',
  authDomain: 'review-form-e7e13.firebaseapp.com',
  databaseURL: 'https://review-form-e7e13-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'review-form-e7e13',
  storageBucket: 'review-form-e7e13.appspot.com',
  messagingSenderId: '28192773006',
  appId: '1:28192773006:web:60eab34d20a4f96f458adf',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const { user } = res;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};
const logout = () => {
  signOut(auth);
};

const Header: React.FC = () => {
  // useGoogleOneTapLogin({
  //   onError: (error) => {
  //     console.log(error);
  //   },
  //   onSuccess: (response) => {
  //     console.log(response);
  //   },
  //   googleAccountConfigs: {
  //     client_id: '28192773006-5vo77gcjallpvkanq7cckslc7if1m4og.apps.googleusercontent.com',
  //   },
  // });

  // window.google?.accounts.id.disableAutoSelect();
  // console.log(window.google);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  return (
    <AppBar
      position="static"
      sx={{
        py: 1,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" alignItems="center">
          <Box sx={{
            width: 50,
            height: 50,
            backgroundColor: 'primary.dark',
            borderRadius: '50%',
            mr: 2,
          }}
          />
          <Typography>Header</Typography>
        </Box>

        {user ? (
          <>
            <IconButton
              size="small"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar src={user.photoURL || undefined} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              sx={{ mt: '45px' }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem color="inherit" onClick={logout}>Sign-Out</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={signInWithGoogle}>Sign-In</Button>
        )}
      </Container>
    </AppBar>
  );
};

export default Header;
