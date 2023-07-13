export interface OrderRequestBody {
  name: string;
  street: string;
  city: string;
  zip: string;
  items: Record<number, number>
}
