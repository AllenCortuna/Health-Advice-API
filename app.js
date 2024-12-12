const express = require("express");
const path = require("path");

const app = express();

// Use the built-in express.json() middleware instead of body-parser
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Sample illness data
const illnessData = {
  flu: {
    description: "Influenza is a viral infection that attacks your respiratory system.",
    do: [
      "Rest and stay hydrated.",
      "Take over-the-counter medications for fever and body aches.",
      "Wash your hands frequently."
    ],
    dont: [
      "Avoid going to crowded places.",
      "Do not overexert yourself.",
      "Avoid alcohol and smoking."
    ],
    goals: [
      "Recover within 7-10 days.",
      "Prevent spreading to others."
    ]
  },
  cold: {
    description: "The common cold is a viral infection of the nose and throat.",
    do: [
      "Stay warm and rest.",
      "Drink plenty of fluids.",
      "Use a humidifier."
    ],
    dont: [
      "Do not take antibiotics (they won't work).",
      "Avoid cold, dry air."
    ],
    goals: [
      "Reduce symptoms within 3-5 days.",
      "Prevent complications like sinus infections."
    ]
  }
};

// API routes
app.get("/illness", (req, res) => {
  res.status(200).json({ illnesses: Object.keys(illnessData) });
});

app.get("/illness/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const illness = illnessData[name];
  if (illness) {
    res.status(200).json({ name, ...illness });
  } else {
    res.status(404).json({ error: "Illness not found" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Health Advice API is running on http://localhost:${PORT}`);
});

