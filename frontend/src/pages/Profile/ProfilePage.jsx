import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ProfilePage() {
  const { userId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/${user.role}/${userId}/profile`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        console.log(data);
        setProfileData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [userId, user.role]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <Tabs defaultValue="view">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="view">View Profile</TabsTrigger>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="view">
          <ViewProfile profileData={profileData} />
        </TabsContent>
        <TabsContent value="edit">
          <EditProfile
            profileData={profileData}
            setProfileData={setProfileData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProfilePage;
