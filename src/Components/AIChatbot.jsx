import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Fab,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  CircularProgress,
} from "@mui/material";
import {
  Send as SendIcon,
  Chat as ChatIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your Rastro shopping assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    // Student-specific response logic
    if (
      lowerInput.includes("budget") ||
      lowerInput.includes("price") ||
      lowerInput.includes("cost")
    ) {
      return "I can help you find furniture that fits your student budget! We offer special student discounts and flexible payment options. What's your budget range?";
    } else if (
      lowerInput.includes("dorm") ||
      lowerInput.includes("apartment")
    ) {
      return "We have furniture specifically designed for dorm rooms and small apartments! Would you like to see our space-saving solutions or multi-functional furniture?";
    } else if (
      lowerInput.includes("study") ||
      lowerInput.includes("desk") ||
      lowerInput.includes("workspace")
    ) {
      return "For your study space, I recommend our ergonomic desks and chairs. We have options that work well for both coding and writing. Would you like to see our study furniture collection?";
    } else if (lowerInput.includes("major") || lowerInput.includes("course")) {
      return "I can recommend furniture based on your major! For example, architecture students might need larger desks for drafting, while computer science students might prefer ergonomic setups. What's your major?";
    } else if (lowerInput.includes("year") || lowerInput.includes("grade")) {
      return "Your academic year helps me suggest appropriate furniture! Freshmen might need more basic dorm essentials, while upperclassmen might want more sophisticated apartment furniture. What year are you in?";
    } else if (lowerInput.includes("help") || lowerInput.includes("assist")) {
      return "I can help you find furniture that matches your student lifestyle! I can recommend items based on your major, year, budget, and living space. What would you like to know?";
    } else if (lowerInput.includes("discount") || lowerInput.includes("deal")) {
      return "We offer student discounts with valid ID! Plus, we have special deals for back-to-school season. Would you like to see our current student promotions?";
    } else if (
      lowerInput.includes("delivery") ||
      lowerInput.includes("shipping")
    ) {
      return "We offer free delivery to most college campuses! For dorms, we can coordinate with your housing office. Would you like to know more about our student delivery options?";
    } else if (lowerInput.includes("return") || lowerInput.includes("refund")) {
      return "We have a student-friendly return policy! You can return items within 30 days, and we offer free pickup from campus locations. Need more details about returns?";
    } else {
      return "I'm here to help you find the perfect furniture for your student life! You can ask me about budget-friendly options, space-saving solutions, or recommendations based on your major and year. What would you like to know?";
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <ChatIcon />
      </Fab>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          sx: { width: { xs: "100%", sm: 400 } },
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h6">Rastro Assistant</Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              overflow: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: "80%",
                    bgcolor:
                      message.sender === "user" ? "primary.main" : "grey.100",
                    color: message.sender === "user" ? "white" : "text.primary",
                  }}
                >
                  <Typography>{message.text}</Typography>
                </Paper>
              </Box>
            ))}
            {isTyping && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} />
                <Typography variant="body2" color="text.secondary">
                  Assistant is typing...
                </Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Divider />

          <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                variant="outlined"
                size="small"
              />
              <IconButton
                color="primary"
                onClick={handleSend}
                disabled={!input.trim()}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default AIChatbot;
