import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Detect if we're in production by checking if we're on Render
  const isProduction = process.env.NODE_ENV === "production" || process.env.RENDER;

  const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: isProduction ? "none" : "strict", // Allow cross-origin cookies in production
    secure: isProduction, // Secure cookies in production
    // Don't set domain in production to allow cross-origin cookies
  };

  console.log("Setting cookie with options:", cookieOptions);
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("RENDER env var:", process.env.RENDER);
  console.log("Detected as production:", isProduction);

  res.cookie("jwt", token, cookieOptions);

  return token;
};
