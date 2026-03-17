let userModel = require("../schemas/users");
let bcrypt = require('bcrypt');

module.exports = {
    CreateAnUser: async function (username, password, email, role,
        fullName, avatarUrl, status, loginCount
    ) {
        let newUser = new userModel({
            username: username,
            password: password,
            email: email,
            fullName: fullName,
            avatarUrl: avatarUrl,
            status: status,
            role: role,
            loginCount: loginCount
        })
        await newUser.save();
        return newUser;
    },
    FindUserByUsername: async function (username) {
        return await userModel.findOne({
            isDeleted: false,
            username: username
        })
    },
    CompareLogin: async function (user, password) {
        if (bcrypt.compareSync(password, user.password)) {
            user.loginCount = 0;
            await user.save()
            return user;
        }
        user.loginCount++;
        if (user.loginCount == 3) {
            user.lockTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
            user.loginCount = 0;
        }
        await user.save()
        return false;
    },
    GetUserById: async function (id) {
        try {
            let user = await userModel.findOne({
                _id: id,
                isDeleted: false
            })
            return user;
        } catch (error) {
            return false;
        }
    },
    ChangePassword: async function (user, oldPassword, newPassword) {
        // Kiểm tra mật khẩu cũ
        if (!bcrypt.compareSync(oldPassword, user.password)) {
            return { success: false, message: "Mật khẩu cũ không đúng" };
        }

        // Validate mật khẩu mới
        if (!newPassword || newPassword.trim().length === 0) {
            return { success: false, message: "Mật khẩu mới không được để trống" };
        }

        if (newPassword.length < 6) {
            return { success: false, message: "Mật khẩu mới phải có ít nhất 6 ký tự" };
        }

        if (newPassword === oldPassword) {
            return { success: false, message: "Mật khẩu mới không được trùng với mật khẩu cũ" };
        }

        // Cập nhật mật khẩu
        try {
            user.password = newPassword;
            await user.save();
            return { success: true, message: "Thay đổi mật khẩu thành công" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}