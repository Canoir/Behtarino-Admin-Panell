export interface User {
  id: number;
  cashback_amount: number;
  email: string;
  image: string;
  image_url: string;
  is_staff: boolean;
  name: string;
  national_id: string | null;
  neighborhood: string | null;
  phone_zero_starts: string;
  thumbnail_url: string;
}
