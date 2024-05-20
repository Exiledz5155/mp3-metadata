import React, { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

interface UUIDContextType {
  uuid: string;
  generateUUID: () => void;
  setNewUUID: (newUUID: string) => void;
}

const UUIDContext = createContext<UUIDContextType | undefined>(undefined);

// Custom react hook (function) for returning generateUUID and UUID
export const useUUID = () => {
  const context = useContext(UUIDContext);
  if (!context) {
    throw new Error("useUUID must be used within a UUIDProvider");
  }
  return context;
};

interface UUIDProviderProps {
  children: React.ReactNode;
}

const UUIDProvider: React.FC<UUIDProviderProps> = ({ children }) => {
  // Fix issues with going back to landing page creating new UUID
  // const [uuid, setUUID] = useState<string>(uuidv4());

  // hardcode for testing
  const [uuid, setUUID] = useState<string>(
    "4a0cf7d0-6947-44f7-b1cc-d755279944af"
    // "b2e2d946-7c24-48e6-9ed1-eb7be7e06cbc"
  );

  const generateUUID = () => {
    const newUUID = uuidv4();
    setUUID(newUUID);
  };

  const setNewUUID = (newUUID: string) => {
    setUUID(newUUID);
  };

  return (
    <UUIDContext.Provider value={{ uuid, generateUUID, setNewUUID }}>
      {children}
    </UUIDContext.Provider>
  );
};

export default UUIDProvider;
