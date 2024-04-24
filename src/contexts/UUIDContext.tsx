import React, { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

interface UUIDContextType {
  uuid: string;
  generateUUID: () => void;
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
    "b96f1984-fef4-4a42-a624-3b4ec5d5ad11"
  );

  const generateUUID = () => {
    const newUUID = uuidv4();
    setUUID(newUUID);
  };

  return (
    <UUIDContext.Provider value={{ uuid, generateUUID }}>
      {children}
    </UUIDContext.Provider>
  );
};

export default UUIDProvider;
