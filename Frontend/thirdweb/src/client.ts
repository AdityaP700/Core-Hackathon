// src/client.ts
import { createThirdwebClient } from "thirdweb";

const cliendID = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

export const client = createThirdwebClient({
  clientId: "a8dab111891c0c0047d3c78d2f8ff406",
});