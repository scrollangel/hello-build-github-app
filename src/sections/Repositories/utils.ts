import { Repository } from "../../domain/Repository";

const FAVORITES_LOCAL_STORAGE_KEY = "favorites";

export function getFavoritesFromLocalStorage(): Array<Repository> {
  const localItems = localStorage.getItem(FAVORITES_LOCAL_STORAGE_KEY);
  const favorites = (
    localItems ? JSON.parse(localItems) : []
  ) as Array<Repository>;

  return favorites;
}

export function setFavoritesToLocalStorage(favorites: Array<Repository>) {
  localStorage.setItem(FAVORITES_LOCAL_STORAGE_KEY, JSON.stringify(favorites));
}
