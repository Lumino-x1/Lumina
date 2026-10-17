/**
 * Lumina verification OTP email template.
 * Professional, accessible, mobile-responsive layout designed according to
 * Lumina's minimalist black-and-white identity.
 */
export function renderVerificationOtpEmailHtml(otp: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your Lumina email address</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #000000;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 520px;
      margin: 40px auto;
      padding: 32px 24px;
      background-color: #0A0A0A;
      border: 1px solid #262626;
      border-radius: 12px;
      box-sizing: border-box;
    }
    .logo-container {
      margin-bottom: 24px;
      text-align: center;
    }
    .logo-text {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: #FFFFFF;
      text-decoration: none;
    }
    .divider {
      height: 1px;
      background-color: #262626;
      margin: 20px 0;
    }
    h1 {
      font-size: 20px;
      font-weight: 600;
      color: #FFFFFF;
      margin-top: 0;
      margin-bottom: 12px;
      text-align: center;
    }
    p {
      font-size: 14px;
      line-height: 1.6;
      color: #A1A1AA;
      margin: 12px 0;
      text-align: center;
    }
    .otp-card {
      margin: 28px 0;
      padding: 20px 16px;
      background-color: #121212;
      border: 1px solid #262626;
      border-radius: 8px;
      text-align: center;
    }
    .otp-code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 36px;
      font-weight: 700;
      letter-spacing: 10px;
      color: #FFFFFF;
      margin: 0;
      padding-left: 10px;
    }
    .expiry-note {
      font-size: 13px;
      color: #71717A;
      margin-top: 8px;
      margin-bottom: 0;
    }
    .footer {
      margin-top: 32px;
      padding-top: 16px;
      border-top: 1px solid #1F1F1F;
      font-size: 12px;
      color: #52525B;
      text-align: center;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo-container">
      <span class="logo-text">Lumina</span>
    </div>
    <div class="divider"></div>
    <h1>Verify your email</h1>
    <p>Welcome to Lumina! Use the following 6-digit code to complete your registration and verify your email address:</p>
    <div class="otp-card">
      <div class="otp-code">${otp}</div>
      <p class="expiry-note">This code expires in 10 minutes</p>
    </div>
    <p>If you did not request this verification code or create a Lumina account, you can safely ignore this email.</p>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Lumina Platform. All rights reserved.
    </div>
  </div>
</body>
</html>`
}

export function renderVerificationOtpEmailText(otp: string): string {
  return `Welcome to Lumina!

Use the following code to verify your email address:

${otp}

This code expires in 10 minutes.

If you did not create a Lumina account, you can ignore this email.`
}
