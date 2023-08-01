
export default interface Card {
    image: string;
    title: string;
    description: string;
    phone: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    creatorId?: number;
    userAddedToFavoritesId?: number,
    id?: number;
    mapLink?: string;
    category: string;
};