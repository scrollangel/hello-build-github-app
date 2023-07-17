import React, { useEffect, useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Repository } from "../../domain/Repository";
import StarIcon from "@mui/icons-material/Star";
import classNames from "classnames";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const GET_REPOSITORIIES_QUERY = gql`
  query GetRepositories {
    viewer {
      repositories(first: 100) {
        totalCount
        edges {
          node {
            name
            url
            id
          }
        }
      }
    }
  }
`;

type Props = {
  favorites: Array<Repository>;
  toggleFavorites: (repository: Repository) => void
}

export function GithubRepositories({favorites, toggleFavorites}: Props) {
  const { loading, error, data } = useQuery(GET_REPOSITORIIES_QUERY);
  const repositories = useMemo(
    () => data?.viewer?.repositories?.edges?.map((e: any) => e.node) || [],
    [data]
  );

  if (loading) {
    return <HourglassBottomIcon fontSize="large" />
  }

  return (
    <section>
      <h1>Repositories</h1>
      <ul>
        {repositories.map((repository: Repository) => {
          const isFavorite = favorites.some((r) => r.id === repository.id);

          return (
            <li key={repository.id}>
              <article className="repository">
                <a href={repository.url} target="_blank">
                  {repository.name}
                </a>
                <button
                  className={classNames({
                    "icon-button": true,
                    highlighted: isFavorite,
                  })}
                  onClick={() => toggleFavorites(repository)}
                  title="Add to favorites"
                >
                  <StarIcon />
                </button>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
