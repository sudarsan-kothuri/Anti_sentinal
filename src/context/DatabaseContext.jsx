import React, { createContext, useContext, useState, useEffect } from 'react';
import { DatabaseService } from '../services/db';

const DatabaseContext = createContext(null);

export function DatabaseProvider({ children }) {
  const [waterBodies, setWaterBodies] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState(DatabaseService.getConnectionStatus());
  const [logs, setLogs] = useState([]);

  // Load initial data
  const refreshData = () => {
    setWaterBodies(DatabaseService.getWaterBodies());
    setAlerts(DatabaseService.getAlerts());
    setConnectionStatus(DatabaseService.getConnectionStatus());
    setLogs(DatabaseService.getLogs());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleUpdateAlertStatus = (alertId, newStatus) => {
    const res = DatabaseService.updateAlertStatus(alertId, newStatus);
    if (res.success) {
      setAlerts(res.data);
      setConnectionStatus(DatabaseService.getConnectionStatus());
    }
    return res;
  };

  const handleAddFieldNote = (alertId, noteText, author) => {
    const res = DatabaseService.addFieldNote(alertId, noteText, author);
    if (res.success) {
      setAlerts(res.data);
      setConnectionStatus(DatabaseService.getConnectionStatus());
    }
    return res;
  };

  const handleCreateAlert = (alertData) => {
    const res = DatabaseService.createAlert(alertData);
    if (res.success) {
      setAlerts(res.all);
      setConnectionStatus(DatabaseService.getConnectionStatus());
    }
    return res;
  };

  const handleSaveWaterBody = (wb) => {
    const res = DatabaseService.saveWaterBody(wb);
    if (res.success) {
      setWaterBodies(res.data);
      setConnectionStatus(DatabaseService.getConnectionStatus());
    }
    return res;
  };

  const handleSetCloudCredentials = (url, key) => {
    const res = DatabaseService.setCloudCredentials(url, key);
    refreshData();
    return res;
  };

  const handleResetDatabase = () => {
    DatabaseService.resetDatabase();
    refreshData();
  };

  return (
    <DatabaseContext.Provider
      value={{
        waterBodies,
        alerts,
        connectionStatus,
        logs,
        refreshData,
        updateAlertStatus: handleUpdateAlertStatus,
        addFieldNote: handleAddFieldNote,
        createAlert: handleCreateAlert,
        saveWaterBody: handleSaveWaterBody,
        setCloudCredentials: handleSetCloudCredentials,
        resetDatabase: handleResetDatabase,
        exportBackup: () => DatabaseService.exportBackup(),
        sqlSchema: DatabaseService.getSqlSchema()
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
