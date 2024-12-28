import { useState } from "react";

interface TravelPreferences {
    travelPace?: string;
    activityTypes?: string;
    budgetRange?: string;
  }
  
  interface ProfileProps {
    profile: {
      name?: string;
      profilePicture?: string;
      timeZone?: string;
      currency?: string;
      travelPreferences?: TravelPreferences;
    };
  }

export default function ProfileForm({ profile }: ProfileProps) {
    
}