export const PasswordData = Array.from({ length: 20 }, (_, index) => ({
    id: `PWD-${index + 1}`,
    username: `user${index + 1}`,
    email: `user${index + 1}@example.com`,
    password_create_date: `2024-01-${(index % 28) + 1}`,
    password_update_date: `2024-03-${(index % 28) + 1}`,
    password_expiry_date: `2025-01-${(index % 28) + 1}`,
    password_strength: ["Weak", "Medium", "Strong", "Very Strong"][index % 4],
    last_password_change: `2024-02-${(index % 28) + 1}`,
    audit_log: [
        {
            action: index % 2 === 0 ? "Password Updated" : "Password Reset",
            timestamp: `2024-03-${(index % 28) + 1} 12:${index % 60} PM`,
            performedBy: index % 2 === 0 ? "User" : "Admin",
        },
    ],
    ip_Address: `192.168.${index % 256}.${index % 100}`,
    device_info: `Device ${index + 1} - ${["Windows", "MacOS", "Linux", "Android", "iOS"][index % 5]}`,
    serial_Number: `SN-${1000 + index}`,
    change_date: `2024-03-${(index % 28) + 1}`,
    mfa_enabled: index % 2 === 0 ? "Enabled" : "Disabled",
    login_attempts: Math.floor(Math.random() * 10),
    last_login: `2024-03-${(index % 28) + 1} 09:${index % 60} AM`,
    failed_login_attempts: Math.floor(Math.random() * 5),
    password_policy: index % 3 === 0 ? "Must include special characters" : "Minimum 12 characters",
    recovery_options: ["Security Questions", "Backup Email", "Authenticator App"][index % 3],
    password_reset_required: index % 4 === 0 ? "Yes" : "No",
    password_reuse_policy: "Cannot reuse last 5 passwords",
    access_role: ["Admin", "Instructor", "Student", "Corporate User"][index % 4],
    account_status: index % 5 === 0 ? "Locked" : "Active",
}));


export const badgeReport =[{
    id:"",
    Email:"",
    video_Title:"",
    course_name:"",
    badge_name:"",
    status:"",
    criteria_Met:"",
    
}]