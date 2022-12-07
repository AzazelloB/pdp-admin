import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";

initializeApp();

export const getUsers = functions
    .region("europe-west2").https.onCall(
        async (data) => {
          const listUsersResult = await getAuth()
              .listUsers(10, data?.pageToken);

          return listUsersResult.users;
        }
    );

export const grantUserRole = functions
    .region("europe-west2").https.onCall(
        async (data) => {
          const user = await getAuth().getUserByEmail(data.email);

          getAuth().setCustomUserClaims(user.uid, {
            role: data.role,
          });
        }
    );

