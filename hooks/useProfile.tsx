import { useEffect, useState } from 'react';
import { profileService } from '../services/profileService';

export interface UserProfile {
  bio: string;
  collage?: string;          // typo backend side se aa raha hai
  college: string;
  currentCompany: string;
  profilePhoto: string;
  resume: string;
  resumeOriginalName: string;
  skills: string[];
}

export interface User {
  _id: string;
  email: string;
  fullname: string;
  phoneNumber: number;
  role: "student" | "recruiter";
  profile: UserProfile;
}
export const useProfile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await profileService.getUser();
            if (storedUser) {
                setUser(storedUser);
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    return { user, loading };
};