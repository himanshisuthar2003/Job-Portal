const admin = require('firebase-admin');
const serviceAccount = require('./package.json'); // Replace with your own service account key

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Function to assign roles
function assignUserRole(uid, role) {
    const customClaims = { role: role };

    return admin
        .auth()
        .setCustomUserClaims(uid, customClaims)
        .then(() => {
            console.log(`Role '${role}' assigned to user with UID '${uid}'`);
        })
        .catch((error) => {
            console.error('Error assigning role:', error);
        });
}

// Example: Assign the 'admin' role to a user
assignUserRole('USER_UID', 'admin');
