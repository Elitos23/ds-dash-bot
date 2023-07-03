import axios from "axios";
import { DISCORD_BASE_URL } from "../constants";
import { UserRoles } from "../types";



type GetUsersResponse = {
  data: UserRoles[];
};

export async function getPartialGuilds(accessToken: string, guildId: string) {
  try {
    // 👇️ const data: GetUsersResponse
    const { data: data, status } = await axios.get<GetUsersResponse>(`${DISCORD_BASE_URL}/users/@me/guilds/${guildId}/member`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(JSON.stringify(data, null));
let roles = JSON.stringify(data, null);
const obj = JSON.parse(roles);
console.log(obj.roles)
let a = obj.roles;
console.log(a.value);

    // 👇️ "response status is: 200"
    console.log('response status is: ', status);

    return a;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}
