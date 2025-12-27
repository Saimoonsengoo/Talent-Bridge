import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadToSupabase } from "../utils/supabaseUpload.js";

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    // ❌ Prevent admin creation from frontend
    if (!["student", "recruiter"].includes(role)) {
      return res.status(403).json({
        message: "Invalid role",
        success: false
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {},
    });

    if (req.file) {
      const photoUrl = await uploadToSupabase(req.file, user._id);
      user.profile.profilePhoto = photoUrl;
      await user.save();
    }

    res.status(201).json({ message: "Account created successfully", success: true });

  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // 🔒 BLOCK LOCKED USERS
    if (user.isLocked) {
      return res.status(403).json({
        message: "Your account has been locked by admin",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: `Welcome back ${user.fullname}`,
        user: userData,
        success: true,
      });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};


// ================= LOGOUT =================
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({
        message: "Logged out successfully",
        success: true,
      });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills, type } = req.body;
    const userId = req.id; // from auth middleware

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Text fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) {
      // Split by comma or space
      user.profile.skills = skills
        .split(/[, ]+/)   // split by comma or one/more spaces
        .map(s => s.trim())
        .filter(Boolean); // remove empty strings
    }



    // File upload
    if (req.file) {
      const fileUrl = await uploadToSupabase(req.file, userId);

      // Save resume by default
      user.profile.resume = fileUrl;
      user.profile.resumeOriginalName = req.file.originalname;
    }


    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// ================= Super ADMIN =================

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // adjust model
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



export const toggleUserLock = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        message: "Cannot lock admin",
        success: false,
      });
    }

    user.isLocked = !user.isLocked;
    await user.save();

    res.status(200).json({
      message: `User ${user.isLocked ? "locked" : "unlocked"} successfully`,
      success: true,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
// Delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

