
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Subject } from '@/lib/data';

interface DashboardLayoutContextType {
  isSubjectBarVisible: boolean;
  toggleSubjectBar: () => void;
  subjects: Subject[];
  selectedContentUrl: string | null;
  setSelectedContentUrl: (url: string | null) => void;
  currentSubjectId: string | null;
  setCurrentSubjectId: (id: string | null) => void;
  currentAssignmentSlotId: string | null;
  setCurrentAssignmentSlotId: (id: string | null) => void;
  selectedContentType: 'pdf' | 'html' | null;
  setSelectedContentType: (type: 'pdf' | 'html' | null) => void;
}

const DashboardLayoutContext = createContext<DashboardLayoutContextType | undefined>(undefined);

interface DashboardLayoutProviderProps {
    children: React.ReactNode;
    initialSubjects?: Subject[];
}

export const DashboardLayoutProvider = ({ children, initialSubjects = [] }: DashboardLayoutProviderProps) => {
  const [isSubjectBarVisible, setIsSubjectBarVisible] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [selectedContentUrl, setSelectedContentUrl] = useState<string | null>(null);
  const [currentSubjectId, setCurrentSubjectId] = useState<string | null>(null);
  const [currentAssignmentSlotId, setCurrentAssignmentSlotId] = useState<string | null>(null);
  const [selectedContentType, setSelectedContentType] = useState<'pdf' | 'html' | null>(null);

  const toggleSubjectBar = () => {
    setIsSubjectBarVisible(prev => !prev);
  };

  const value = {
    isSubjectBarVisible,
    toggleSubjectBar,
    subjects,
    selectedContentUrl,
    setSelectedContentUrl,
    currentSubjectId,
    setCurrentSubjectId,
    currentAssignmentSlotId,
    setCurrentAssignmentSlotId,
    selectedContentType,
    setSelectedContentType,
  };

  return (
    <DashboardLayoutContext.Provider value={value}>
      {children}
    </DashboardLayoutContext.Provider>
  );
};

export const useDashboardLayout = () => {
  const context = useContext(DashboardLayoutContext);
  if (context === undefined) {
    throw new Error('useDashboardLayout must be used within a DashboardLayoutProvider');
  }
  return context;
};
