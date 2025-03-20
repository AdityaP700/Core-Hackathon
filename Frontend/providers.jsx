import { createThirdwebClient } from "thirdweb";
//require('dotenv').config();

const client = createThirdwebClient({
  // use clientId for client side usage
  clientId: "09b90d9da477681ddcad30ee8de156fd",
  // use secretKey for server side usage
  secretKey: process.env.thirdWeb_SecretKey, // replace this with full secret key
});
