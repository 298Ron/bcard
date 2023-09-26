
export default interface Card {
    image: string;
    title: string;
    description: string;
    phone: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    creatorId?: string;
    userAddedToFavoritesId?: number,
    _id?: string;
    mapLink?: string;
    category: string;
};