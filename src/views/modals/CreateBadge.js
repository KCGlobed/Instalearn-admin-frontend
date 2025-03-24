import React, { useState } from "react";
import {
    TextField,
    MenuItem,
    Button,
    Box,
    Typography,
    Card,
    CardContent,
} from "@mui/material";
import {
    LocalFireDepartment,
    NewReleases,
    TrendingUp,
    Star,
    EmojiEvents,
} from "@mui/icons-material";

const icons = {
    "🔥 Trending": <LocalFireDepartment fontSize="small" />,
    "🆕 New": <NewReleases fontSize="small" />,
    "📈 Popular": <TrendingUp fontSize="small" />,
    "⭐ Featured": <Star fontSize="small" />,
    "🏆 Champion": <EmojiEvents fontSize="small" />,
};

const BadgeForm = () => {
    const [title, setTitle] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("🔥 Trending");
    const [color, setColor] = useState("#ff5733");

    return (
        <div>
            <Typography variant="h6" fontWeight="bold" gutterBottom align="center" sx={{ fontSize: "1rem" }}>
                🎖️ Create a Badge
            </Typography>
            <CardContent sx={{ p: 2 }}>
                <TextField
                    label="Badge Title"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    size="small"
                    style={{ marginBottom: "5px" }}
                />
                <TextField
                    select
                    label="Select Badge Type"
                    fullWidth
                    margin="dense"
                    value={selectedIcon}
                    onChange={(e) => setSelectedIcon(e.target.value)}
                    size="small"
                >
                    {Object.keys(icons).map((icon) => (
                        <MenuItem key={icon} value={icon} sx={{ fontSize: "0.9rem", py: 0.5 }}>
                            {icons[icon]} {icon}
                        </MenuItem>
                    ))}
                </TextField>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <Typography variant="body2" fontWeight="medium">
                        Select Color:
                    </Typography>
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        style={{ width: "80px", height: "30px", borderRadius: "5px", border: "none" }}
                    />
                </Box>
                <Typography variant="subtitle2" fontWeight="medium" mt={2}>
                    Badge Preview:
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1.5,
                        mt: 1,
                        borderRadius: 2,
                        bgcolor: color,
                        color: "white",
                        fontWeight: "bold",
                        justifyContent: "center",
                        boxShadow: 2,
                        fontSize: "0.9rem",
                    }}
                >
                    {icons[selectedIcon]}
                    <Typography variant="body2">{title || "Badge Title"}</Typography>
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, borderRadius: 2, py: 1, fontSize: "0.85rem" }}
                    onClick={() => alert(`✅ Badge Created: ${title}`)}
                >
                    Save Badge
                </Button>
            </CardContent>
        </div>
    );
};

export default BadgeForm;
