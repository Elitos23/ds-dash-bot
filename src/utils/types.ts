export type PartialGuild = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
};
export type UserDetails = {
  discordId: string;
  accessToken: string;
  refreshToken: string;
  username: string;
  discriminator: string;


};

export type FCFSConfig = {
  spots: string;
  roleId: string;
  channel: string;
  message: string;
}

export type UserRoles = {
avatar?: string;
roles: string[];
}
