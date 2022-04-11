import { AvatarConfig, AvatarSource } from "ngx-avatar";



export const avatarConfig: AvatarConfig = {
  sourcePriorityOrder: [
    AvatarSource.CUSTOM,
    AvatarSource.INITIALS
  ],
  colors: ['transparent']
};
