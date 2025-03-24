export const initialData = Array.from({ length: 20 }, (_, index) => ({
    key: (index + 1).toString(),
    name: `User ${index + 1}`,
    age: 20 + (index % 30),
    address: `Street ${index + 1}, City ${index + 1}`,
    email: `user${index + 1}@example.com`,
    ph_number: `90000000${index}`,
    city: `City ${index + 1}`,
    state: `State ${index + 1}`,
    country: "USA",
    pincode: `1000${index}`,
    last_Login: `2025-03-${(index % 28) + 1}`,
    isActive: index % 2 === 0 ? "Yes" : "No",
    permission: index % 3 === 0 ? "admin" : "student",
    courses: Array.from({ length: (index % 3) + 1 }, (_, courseIndex) => ({
        course_id: `10${courseIndex + 1}`,
        course_name: `Course ${courseIndex + 1}`,
        progress: Math.floor(Math.random() * 100),
        watchtime: Math.floor(Math.random() * 50),
    })),
    wishlist: ["Course A", "Course B", "Course C"].slice(0, (index % 3) + 1),
    mygoals: "Achieve mastery in coding",
    review: Array.from({ length: index % 2 }, (_, reviewIndex) => ({
        course_id: `10${reviewIndex + 1}`,
        rating: (Math.random() * 5).toFixed(1),
        comment: "Very informative course!",
    })),
    total_watch_time: Math.floor(Math.random() * 200),
    certificates_earned: index % 4 === 0 ? Math.floor(Math.random() * 5) : 0,
    enrolled_date: `2024-01-${(index % 28) + 1}`,
    subscription_type: index % 3 === 0 ? "Premium" : "Free",
    last_course_activity: `2025-03-${(index % 28) + 1}`
}));





