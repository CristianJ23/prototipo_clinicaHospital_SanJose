exports.login = (req, res) => {
    const { email, password } = req.body;
  
    if (email === "admin@clinica.com" && password === "12345") {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  };
  
  exports.forgotPassword = (req, res) => {
    const { email } = req.body;
  
    if (email) {
      res.status(200).json({ message: "Password reset link sent to your email" });
    } else {
      res.status(400).json({ message: "Email is required" });
    }
  };
  
  exports.resetPassword = (req, res) => {
    const { newPassword, confirmPassword } = req.body;
  
    if (newPassword === confirmPassword) {
      res.status(200).json({ message: "Password successfully reset" });
    } else {
      res.status(400).json({ message: "Passwords do not match" });
    }
  };