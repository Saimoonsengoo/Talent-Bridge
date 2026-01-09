import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

// Create admin if not exists 
// if admin already exists, do nothing
const createAdminIfNotExists = async () => {
    const adminEmail = "admin@jobportal.com";

    const adminExists = await User.findOne({ email: adminEmail });
    if (adminExists) {
        console.log("Admin already exists");
        return;
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
        fullname: "System Admin",
        email: adminEmail,
        phoneNumber: 999999999,
        password: hashedPassword, 
        role: "admin",
        isLocked: false,
        profile: {
            bio: "System administrator of the Job Portal",
            skills: ["management", "moderation", "system-control"],
            resume: "",
            resumeOriginalName: "",
            company: null,
            profilePhoto: ""
        }
    });

    console.log("----Admin created----");
};

export default createAdminIfNotExists;
