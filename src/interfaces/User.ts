export default interface User {
    id?: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    imageUrl?: string;
    imageAlt?: string;
    state?: string;
    country: string;
    city: string;
    street?: string;
    houseNumber?: number;
    zip?: number;
    role?: string;
}