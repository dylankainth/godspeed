import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

// import the user type from the auth module
import { User as NextAuthUser } from "next-auth";

interface User extends NextAuthUser {
  createdAt: string;
}

export default function UserProfile({ user }: { user: User }) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="flex flex-col items-center space-y-4">
        <Avatar className="w-32 h-32">
          <AvatarImage
            src={user.image || undefined}
            alt={user.name || "User"}
          />
          <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Email</h3>
            <p>{user.email}</p>
          </div>
          <div>
            <h3 className="font-semibold">Member Since</h3>
            <p>
              {new Date(user.createdAt || Date.now()).toLocaleDateString(
                "en-gb"
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
