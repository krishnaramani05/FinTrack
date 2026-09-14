const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Transaction = require("./models/Transaction");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Atlas connected!");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

// Trial
app.get("/", (req, res) => {
    res.send("FinTrack Backend is running!");
});

// Submit a transaction
app.post("/api/transactions", async (req, res) => {
    try {
        const transaction = new Transaction(req.body);

        const savedTransaction = await transaction.save();

        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({
            message: "Failed to save transaction",
            error: error.message
        });
    }
});

// Retrieve all transactions
app.get("/api/transactions", async (req, res) => {
    try {
        const transactions = await Transaction.find();

        res.json(transactions);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get transactions",
            error: error.message
        });
    }
});

// Edit a transaction
app.put("/api/transactions/:id", async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedTransaction);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update transaction",
            error: error.message
        });
    }
});

// Delete a transaction
app.delete("/api/transactions/:id", async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);

        res.json({
            message: "Transaction deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete transaction",
            error: error.message
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});