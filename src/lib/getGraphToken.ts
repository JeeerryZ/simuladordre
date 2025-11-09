import { ConfidentialClientApplication } from "@azure/msal-node";

export async function getGraphToken() {
  const msalConfig = {
    auth: {
      clientId: process.env.AZURE_CLIENT_ID!,
      authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
      clientSecret: process.env.AZURE_CLIENT_SECRET!,
    },
  };

  const cca = new ConfidentialClientApplication(msalConfig);

  const result = await cca.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });
  return result?.accessToken;
}
