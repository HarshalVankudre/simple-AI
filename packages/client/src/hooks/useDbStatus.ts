import { useState, useEffect } from "react";
import { getDbStatus } from "../lib/api";

export const useDbStatus = () => {
  const [dbStatus, setDbStatus] = useState<string>("Connecting to database...");

  useEffect(() => {
    const fetchDbStatus = async () => {
      const status = await getDbStatus();
      if (status.db === "connected") {
        setDbStatus("Database connected successfully");
      } else {
        setDbStatus("Failed to connect to the database");
      }
    };
    fetchDbStatus();
  }, []);

  return dbStatus;
};