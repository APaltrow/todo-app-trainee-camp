import { ChangeEvent, FC, useState } from 'react';

import { IconsTypes } from '@types';
import { useActions, useAppSelector } from '@redux';
import { convertToBase64 } from '@helpers';
import { useDelayedResetError } from '@hooks';
import { FILE_MAX_SIZE, ResMessages } from '@constants';
import { Icon, PhotoUploader, Error } from '@components';

import style from './Profile.module.scss';

export const ProfilePhoto: FC = () => {
  const {
    user,
    isUploadLoading,
    uploadError: reqError,
  } = useAppSelector((state) => state.auth);

  const { uploadPhotoThunk, resetUserError } = useActions();
  const [uploadError, setUploadError] = useState('');

  const error = uploadError || reqError;

  useDelayedResetError(() => {
    setUploadError('');
    resetUserError();
  }, error);

  if (!user) return null;

  const { profileImg } = user;

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;

    const [file] = files;

    const profileImg = await convertToBase64(file);

    if (profileImg.length > FILE_MAX_SIZE) {
      setUploadError(ResMessages.FILE_SIZE);

      return;
    }

    uploadPhotoThunk({ profileImg });
  };

  return (
    <div className={style.user_photo_container}>
      {profileImg ? (
        <img
          className={style.user_photo}
          src={profileImg}
          alt="Profile image"
        />
      ) : (
        <span className={style.photo_alt}>
          <Icon iconName={IconsTypes.PROFILE} />
        </span>
      )}

      <div className={style.photo_btn}>
        <PhotoUploader
          name="profileImg"
          isLoading={isUploadLoading}
          onChange={handleFileUpload}
        />
      </div>

      {!!error && (
        <div className={style.error}>
          <Error message={error} />
        </div>
      )}
    </div>
  );
};
