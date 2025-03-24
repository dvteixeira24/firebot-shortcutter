import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createCA, createCert } from "mkcert";

export const getCerts = async () => {
  try {
    // Try to read existing certificate and private key files
    const key = readFileSync("certs/privatekey.pem");
    const certificate = readFileSync("certs/certificate.pem");
    return { key, certificate };
  } catch (e) {
    // If files don't exist, create them
    try {
      const certsDir = "certs";

      // Check if certs directory exists, if not, create it
      if (!existsSync(certsDir)) {
        console.log("Certs directory does not exist. Creating it...");
        mkdirSync(certsDir);
      }

      console.log("Generating new certificate and private key...");

      // Define options for the Certificate Authority (CA)
      const caOptions = {
        organization: "dd.ddd",
        countryCode: "US",
        state: "California",
        locality: "San Francisco",
        validity: 365, // Valid for 1 year
      };

      // Create the root certificate authority (CA)
      const ca = await createCA(caOptions);
      // Define options for the certificate
      const certOptions = {
        domains: [...(process.env.HOSTNAME?.split(",") || "localhost")], // Adjust this as needed
        validity: 365, // Valid for 1 year
        ca: ca, // Pass the created CA
      };

      // Create a certificate signed by the CA
      const cert = await createCert(certOptions);

      // Write the generated certificates to the file system
      writeFileSync("certs/privatekey.pem", cert.key);
      writeFileSync("certs/certificate.pem", cert.cert);

      console.log("Certificates generated and saved!");

      return { key: cert.key, certificate: cert.cert };
    } catch (err) {
      console.error("Error creating certificates:", err);
      throw err;
    }
  }
};
