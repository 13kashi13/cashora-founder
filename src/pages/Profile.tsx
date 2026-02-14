import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Save, User, Mail, AtSign, FileText } from "lucide-react";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface UserProfile {
  displayName: string;
  username: string;
  bio: string;
  photoURL: string;
}

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    displayName: user?.displayName || "",
    username: "",
    bio: "",
    photoURL: user?.photoURL || "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Load profile from Firestore
    const loadProfile = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            displayName: data.displayName || user.displayName || "",
            username: data.username || "",
            bio: data.bio || "",
            photoURL: data.photoURL || user.photoURL || "",
          });
        } else {
          // Initialize with user data
          setProfile({
            displayName: user.displayName || "",
            username: "",
            bio: "",
            photoURL: user.photoURL || "",
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    loadProfile();
  }, [user, navigate]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      setUploading(true);
      
      // Upload to Firebase Storage
      const storageRef = ref(storage, `profile-photos/${user.uid}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      // Update profile state immediately for instant feedback
      setProfile(prev => ({ ...prev, photoURL }));
      
      toast.success("Photo uploaded! Click Save to apply changes.");
    } catch (error: any) {
      console.error("Error uploading photo:", error);
      toast.error(error.message || "Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
      });

      // Save to Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName: profile.displayName,
        username: profile.username,
        bio: profile.bio,
        photoURL: profile.photoURL,
        email: user.email,
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      toast.success("Profile updated successfully!");
      
      // Force auth context to refresh
      window.location.reload();
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast.error(error.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        className="w-full max-w-2xl backdrop-blur-2xl rounded-3xl p-8"
        style={{
          background: 'rgba(5, 10, 10, 0.6)',
          border: '1px solid rgba(124, 255, 178, 0.3)',
          boxShadow: '0 0 60px rgba(124, 255, 178, 0.15)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/" className="inline-flex items-center gap-2 mb-8 text-sm" style={{ color: 'rgba(124, 255, 178, 0.8)' }}>
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-2" style={{
          background: 'linear-gradient(90deg, #7CFFB2 0%, #5CE1E6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Edit Profile
        </h1>
        <p className="text-sm mb-8" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Update your profile information
        </p>

        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div
              className="w-32 h-32 rounded-full overflow-hidden"
              style={{
                border: '3px solid rgba(124, 255, 178, 0.3)',
                boxShadow: '0 0 30px rgba(124, 255, 178, 0.2)',
              }}
            >
              {profile.photoURL ? (
                <img
                  src={profile.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(124, 255, 178, 0.1)' }}>
                  <User className="w-16 h-16" style={{ color: 'rgba(124, 255, 178, 0.5)' }} />
                </div>
              )}
            </div>
            
            <motion.button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #1ED760, #5CE1E6)',
                boxShadow: '0 0 20px rgba(30, 215, 96, 0.4)',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Camera className="w-5 h-5" style={{ color: '#000' }} />
            </motion.button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          
          {uploading && (
            <p className="text-xs mt-2" style={{ color: 'rgba(124, 255, 178, 0.8)' }}>
              Uploading...
            </p>
          )}
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              <User className="w-4 h-4" />
              Display Name
            </label>
            <input
              type="text"
              value={profile.displayName}
              onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl backdrop-blur-xl outline-none"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
                color: '#fff',
                transition: 'all 0.15s ease-out',
              }}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              <AtSign className="w-4 h-4" />
              Username
            </label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') }))}
              className="w-full px-4 py-3 rounded-xl backdrop-blur-xl outline-none"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
                color: '#fff',
                transition: 'all 0.15s ease-out',
              }}
              placeholder="username"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              <Mail className="w-4 h-4" />
              Email
            </label>
            <input
              type="email"
              value={user.email || ""}
              disabled
              className="w-full px-4 py-3 rounded-xl backdrop-blur-xl outline-none opacity-50 cursor-not-allowed"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
                color: '#fff',
              }}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              <FileText className="w-4 h-4" />
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              maxLength={160}
              className="w-full px-4 py-3 rounded-xl backdrop-blur-xl outline-none resize-none"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(124, 255, 178, 0.2)',
                color: '#fff',
                transition: 'all 0.15s ease-out',
              }}
              placeholder="Tell us about yourself..."
            />
            <p className="text-xs mt-1 text-right" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              {profile.bio.length}/160
            </p>
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold relative overflow-hidden mt-8 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(90deg, #1ED760, #5CE1E6)',
            color: '#000',
            boxShadow: '0 0 30px rgba(30, 215, 96, 0.4)',
          }}
          whileHover={{ boxShadow: '0 0 40px rgba(30, 215, 96, 0.6)', scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          <Save className="w-5 h-5" />
          {loading ? "Saving..." : "Save Changes"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Profile;
