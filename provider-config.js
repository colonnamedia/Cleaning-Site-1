export const providerConfig = {
  demoMode: true,
  scheduling: { enabled: false, provider: "CLIENT_SELECTION_REQUIRED", bookingUrl: "" },
  recurringBilling: { enabled: false, provider: "CLIENT_SELECTION_REQUIRED", enrollmentUrl: "" },
  quoteDelivery: { enabled: false, provider: "CLIENT_CRM_OR_INBOX_REQUIRED", destination: "" },
  launchGate: "Credentials, consent language, real services and prices, plus end-to-end testing are required before enabling submissions, scheduling, recurring billing, uploads, confirmations, or payments."
};
