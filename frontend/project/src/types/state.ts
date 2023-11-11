import { AuthorizationStatus, SubmitStatus } from '../const';
import store from '../store';
import type { Offer, City, SortName, User, Comments } from './types';

export type SiteData = {
    offers: Offer[];
    isOffersLoading: boolean;
    offer: Offer | null;
    isOfferLoading: boolean;
    favoriteOffers: Offer[];
    isFavoriteOffersLoading: boolean;
    premiumOffers: Offer[];
    comments: Comments;
    commentStatus: SubmitStatus;
};

export type SiteProcess = {
    city: City;
    sorting: SortName;
}

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    user: User['email'];
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
