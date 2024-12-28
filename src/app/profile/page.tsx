"use client";

import { useState, useEffect } from "react";
import ProfileForm from "@/components/ProfileForm";

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            const response = await fetch("/api/user/profile");

            if (response.ok) {
                const data = await response.json();
                setProfile(data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!profile) return <p>Failed to load profile</p>;

    return (
        <div>
            <h1>User Profile</h1>
            <ProfileForm profile={profile} />
        </div>
    )
}