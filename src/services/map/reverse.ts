import { MAP_IR_API_KEY } from '@constants/config';
import axios from 'axios';
import endpoints from '@constants/endpoints';

type Response = { last: string; neighbourhood: string; primary: string };
export async function getReverseAddressFromMapIR(lat: string, lon: string): Promise<Response> {
  try {
    return (
      await axios.get(
        endpoints.mapReverse(lat, lon),

        {
          headers: {
            'X-API-Key': MAP_IR_API_KEY || ''
          }
        }
      )
    ).data as Response;
  } catch (error) {
    throw error;
  }
}
