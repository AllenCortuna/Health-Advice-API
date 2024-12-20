// api/illness.js

const express = require('express');
const app = express();

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

// Middleware to parse JSON
app.use(express.json());

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

// Export the function for Vercel serverless
module.exports = (req, res) => {
  app(req, res); // Make sure the express app handles the request
};
