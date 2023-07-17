import { useEffect, useState } from "react";
import { Repository } from "../../domain/Repository";

import StarIcon from "@mui/icons-material/Star";
import {
  getFavoritesFromLocalStorage,
  setFavoritesToLocalStorage,
} from "./utils";
import classNames from "classnames";

type Props = {
  isOpen: boolean;
  favorites: Array<Repository>;
  removeFromFavorites: (Repository: Repository) => void;
};

export function FavoritesRepositories({
  isOpen,
  favorites,
  removeFromFavorites,
}: Props) {
  return (
    <section className={classNames({ drawer: true, open: isOpen })}>
      <ul>
        {favorites.map((repository: Repository) => (
          <li key={repository.id}>
            <article className="repository">
              <a href={repository.url} target="_blank">
                {repository.name}
              </a>
              <button
                className="icon-button highlighted"
                onClick={() => removeFromFavorites(repository)}
              >
                <StarIcon />
              </button>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
