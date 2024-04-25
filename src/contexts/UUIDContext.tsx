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
    "921162b9-8ab9-4c42-9b4c-259b767478f2"
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
