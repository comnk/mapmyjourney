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
    const [formData, setFormData] = useState({
        name: profile.name || "",
        profilePicture: profile.profilePicture || "",
        timeZone: profile.timeZone || "",
        currency: profile.currency || "",
        travelPreferences: {
          travelPace: profile.travelPreferences?.travelPace || "",
          activityTypes: profile.travelPreferences?.activityTypes || "",
          budgetRange: profile.travelPreferences?.budgetRange || "",
        },
    });

    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("/api/user/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setMessage("Profile updated successfully");
        } else {
            setMessage("Failed to update profile");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </label>
            <label>
                Profile Picture:
                <input
                type="text"
                value={formData.profilePicture}
                onChange={(e) =>
                    setFormData({ ...formData, profilePicture: e.target.value })
                }
                />
            </label>
            <label>
                Time Zone:
                <input
                type="text"
                value={formData.timeZone}
                onChange={(e) =>
                    setFormData({ ...formData, timeZone: e.target.value })
                }
                />
            </label>
            <label>
                Currency:
                <input
                type="text"
                value={formData.currency}
                onChange={(e) =>
                    setFormData({ ...formData, currency: e.target.value })
                }
                />
            </label>
            <label>
                Travel Pace:
                <input
                type="text"
                value={formData.travelPreferences.travelPace}
                onChange={(e) =>
                    setFormData({
                    ...formData,
                    travelPreferences: {
                        ...formData.travelPreferences,
                        travelPace: e.target.value,
                    },
                    })
                }
                />
            </label>
            <label>
                Activity Types:
                <input
                type="text"
                value={formData.travelPreferences.activityTypes}
                onChange={(e) =>
                    setFormData({
                    ...formData,
                    travelPreferences: {
                        ...formData.travelPreferences,
                        activityTypes: e.target.value,
                    },
                    })
                }
                />
            </label>
            <label>
                Budget Range:
                <input
                type="text"
                value={formData.travelPreferences.budgetRange}
                onChange={(e) =>
                    setFormData({
                    ...formData,
                    travelPreferences: {
                        ...formData.travelPreferences,
                        budgetRange: e.target.value,
                    },
                    })
                }
                />
            </label>
            <button type="submit">Save</button>
            {message && <p>{message}</p>}
        </form>
    )
}