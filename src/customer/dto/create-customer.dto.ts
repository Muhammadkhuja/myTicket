export class CreateCustomerDto {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  confirm_password: string;
  birth_date: Date;
  gander: boolean;
  lang_id: number;
}
