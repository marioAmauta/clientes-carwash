import { UpdateProfileSchemaDataType } from "@/lib/definitions";

import { TypographyH1 } from "@/components/ui/typography";

import { ButtonUpdateProfile } from "./button-update-profile";
import { FormUpdateProfile } from "./form-update-profile";

export function ProfileHeader({ username, userId }: UpdateProfileSchemaDataType) {
  return (
    <header className="flex flex-wrap items-center justify-center gap-4">
      <TypographyH1 className="break-all">{username}</TypographyH1>
      <ButtonUpdateProfile>
        <FormUpdateProfile username={username} userId={userId} />
      </ButtonUpdateProfile>
    </header>
  );
}
