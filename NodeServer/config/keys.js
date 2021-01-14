module.exports = {
  // configuration database
  dbUser: "sa",
  //dbPassword: '=j;pvo6Pk9Cyofh;p',
  dbPassword: "P@ssw0rd2016",
  //dbServer: '172.16.6.76',
  //dbServer: '192.168.1.50',
  dbServer: "54.66.189.51",
  dbDatabase: "SMMSDEV",
  // configuration email
  smtpHost: "smtp.gmail.com",
  // smtpHost: "cp241.ezyreg.com",
  smtpPort: 465,
  smtpUser: "no-reply@aic.nsw.edu.au",
  // smtpUser: "no-reply@nswbc.nsw.edu.au",
  smtpPass: "Sydney2020!",

  // configuration old smms database server
  current_dbUser: "sa",
  current_dbPassword: "P@ssw0rd2016",
  //dbServer: '192.168.64.10',
  current_dbServer: "54.66.189.51",
  current_dbDatabase_aic: "AIC",
  current_dbDatabase_nswbc: "NSWBC",
  current_dbDatabase_nswenglish: "NSWEnglish",

  //   xero_config: {
  //     appType: "public",
  //     consumerKey: "883D9F126F694A9984F54AE2441D7ACC",
  //     consumerSecret: "ZoQeyIrP3E1RqB04x7r3DV9kpFuuyPDrHmLxi25NJoCbpaju",
  //     callbackUrl: "null"
  //     // privateKeyPath: "C:\\keys\\your_private_key.pem"
  //   }

  xero_config: {
    appType: "public",
    client_id: "304CD758247242E59AD205A987AFBDE6",
    client_secret: "1E7azyVPOQxWdGbynJU0hzK2CjfjqV4Su68v5esyaPVJGxW9",
    redirectUri: "http://localhost:3000/api/xeros/callback",
    scope:
      "openid profile email accounting.settings accounting.reports.read accounting.journals.read accounting.contacts accounting.attachments accounting.transactions offline_access",
    // privateKeyPath: "C:\\keys\\your_private_key.pem"
  },
};
