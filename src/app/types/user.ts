export interface UserName {
  firstname: string;
  lastname: string;
}

export interface Geolocation {
  lat: string;
  long: string;
}

export interface Address {
  geolocation: Geolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: UserName;
  address: Address;
  phone: string;
}
