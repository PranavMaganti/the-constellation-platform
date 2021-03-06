import { useRouter } from "next/dist/client/router";
import React, { useCallback, useMemo, useState } from "react";
import EditIcon from "../../../../assets/edit.svg";
import SaveIcon from "../../../../assets/save.svg";
import { RedRoundedButton } from "../../../../components/Buttons";
import EndIconButton from "../../../../components/Buttons/EndIconButton";
import CountryDialog from "../../../../components/Dialogs/CountryDialog";
import ImageUploadDialog from "../../../../components/Dialogs/ImageUploadDialog";
import TextInput from "../../../../components/Inputs/TextInput";
import { ProfileHeader } from "../../../../components/Profile/ProfileHeader";
import ErrorDataLayout from "../../../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../../../components/Scaffolds/PageScaffold";
import countries, {
  Country,
  findCountryByCode,
  noneCountry,
} from "../../../../utils/countries";
import { updateUserInfo, useUserInfo } from "../../../../utils/supabase/db";
import {
  getAvatarUrl,
  moveTempAvatar,
} from "../../../../utils/supabase/storage";
import UnfoldMoreIcon from "../../../../assets/unfold.svg";

export default function EditProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    userInfo,
    setUserInfo,
    error: userInfoError,
  } = useUserInfo(id as string);
  const selectedCountry = useMemo(
    () => findCountryByCode(userInfo?.location),
    [userInfo]
  );
  const [isUploading, setIsUploading] = useState(false);
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [avatarChanged, setAvatarChanged] = useState(false);
  const setUserInfoField = useCallback(
    (field: string, value?: string | null) => {
      if (userInfo && value) {
        setUserInfo({
          ...userInfo,
          [field]: value,
        });
      }
    },
    [setUserInfo, userInfo]
  );
  const [error, setError] = useState<string | undefined>(undefined);

  const onSave = useCallback(async () => {
    if (userInfo) {
      // Check that url is a supabase one
      if (avatarChanged) {
        const { error } = await moveTempAvatar(userInfo.id);

        if (error) {
          setError(
            "Couldn't save updated profile picture. Please try saving again."
          );
          return;
        }

        setUserInfoField(
          "avatarUrl",
          getAvatarUrl(userInfo.id, "public").publicURL
        );
      }

      const { error } = await updateUserInfo(userInfo);
      if (!error) {
        router.push(`/profile/${userInfo.id}`);
      } else {
        setError("Couldn't save new profile details. Please try again.");
      }
    }
  }, [avatarChanged, router, setUserInfoField, userInfo]);

  return (
    <PageScaffold
      icon={<EditIcon width="50" height="50" />}
      title="Edit Profile"
    >
      <ErrorDataLayout error={userInfoError} data={userInfo}>
        {error && <p className="text-xl text-red-700 mt-2 mb-2">{error}</p>}
        <ProfileHeader
          userInfo={userInfo}
          onAvatarClick={() => setIsUploading(true)}
          button={
            <RedRoundedButton
              text="Save"
              icon={
                <SaveIcon
                  height="24"
                  width="24"
                  className="fill-current text-white"
                />
              }
              onClick={onSave}
            />
          }
        />
        <div className="flex gap-x-5 w-full mt-8">
          <TextInput
            value={userInfo?.full_name ?? ""}
            setValue={(value: string) => setUserInfoField("full_name", value)}
            label="Full Name"
            className="flex-1"
            inputClassName="text-lg rounded-lg shadow-sm"
          />

          <EndIconButton
            className="flex-1"
            label="Country"
            value={selectedCountry.name}
            onClick={() => setShowCountryDialog(true)}
            icon={
              <UnfoldMoreIcon
                width="24"
                height="24"
                className="fill-current text-gray-400"
                aria-hidden="true"
              />
            }
          />
        </div>
        <TextInput
          className="flex-1 pt-4"
          inputClassName="text-lg rounded-lg shadow-sm"
          value={userInfo?.description ?? ""}
          setValue={(value: string) => setUserInfoField("description", value)}
          label="Description (Max 100 characters)"
          maxLength={100}
        />
        <ImageUploadDialog
          isOpen={isUploading}
          setIsOpen={setIsUploading}
          userId={userInfo?.id}
          onUpload={(url: string, isUpload: boolean) => {
            setUserInfoField("avatar_url", url);
            setAvatarChanged(isUpload);
          }}
        />
        <CountryDialog
          countries={[noneCountry, ...countries]}
          selected={selectedCountry}
          setSelected={(country: Country) =>
            setUserInfoField("location", country.code)
          }
          isOpen={showCountryDialog}
          setIsOpen={setShowCountryDialog}
        />
      </ErrorDataLayout>
    </PageScaffold>
  );
}
