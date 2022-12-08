import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {getAuth} from "firebase-admin/auth";

initializeApp();
const db = getFirestore();

export const getUserRoleList = functions
    .region("europe-west2").https.onCall(
        async () => {
          const authenticatedUsersResult = await getAuth()
              .listUsers();
          const userRoleListResult = await db.collection("userRole").get();

          return [
            ...authenticatedUsersResult.users.map((user) => ({
              email: user.email,
              role: user.customClaims?.role,
            })),
            ...userRoleListResult.docs.map((doc) => ({
              email: doc.get("email"),
              role: doc.get("role"),
            })),
          ];
        }
    );

export const setUserRole = functions
    .region("europe-west2").https.onCall(
        async (data) => {
          try {
            const user = await getAuth().getUserByEmail(data.email);

            getAuth().setCustomUserClaims(user.uid, {
              role: data.role,
            });
          } catch {
            const docs = await db
                .collection("userRole")
                .where("email", "==", data.email)
                .get();

            if (docs.docs[0]?.id) {
              db.collection("userRole").doc(docs.docs[0].id).update({
                role: data.role,
              });
            }
          }

          return {
            email: data.email,
            role: data.role,
          };
        }
    );

export const addUserRole = functions
    .region("europe-west2").https.onCall(
        async (data) => {
          await db
              .collection("userRole")
              .add({
                email: data.email,
                role: data.role,
              });

          return true;
        }
    );

export const registerUser = functions
    .region("europe-west2").https.onCall(
        async (data, context) => {
          if (context.auth?.token.role) {
            return;
          }

          const email = data.email;
          let role = "employee";

          try {
            const docs = await db
                .collection("userRole")
                .where("email", "==", email)
                .get();

            if (docs.docs[0]?.id) {
              role = docs.docs[0].get("role");

              db.collection("userRole").doc(docs.docs[0].id).delete();
            }
          } catch {
            // do nothing
          }

          const user = await getAuth().getUserByEmail(email);

          await getAuth().setCustomUserClaims(user.uid, {
            role,
          });
        }
    );

