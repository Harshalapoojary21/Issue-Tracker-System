import mongoose from "mongoose";
import dns from "dns";

const ensureDnsResolution = () => {
  const servers = dns.getServers();
  const isLocalResolver = servers.length > 0 && servers.every((server) => server.startsWith("127.") || server === "::1");

  if (isLocalResolver) {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    console.warn("⚠️ Local DNS resolver detected; using fallback public DNS servers for MongoDB SRV lookup.");
  }
};

const connectDB = async () => {
  try {
    ensureDnsResolution();

    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log(" MongoDB Connected");
  } catch (error) {
    console.log("Database Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
