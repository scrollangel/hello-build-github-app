import React, { useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Repository } from "../../domain/Repository";

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

export function GithubRepositories() {
  const { loading, error, data } = useQuery(GET_REPOSITORIIES_QUERY);
  const repositories = useMemo(
    () => data?.viewer?.repositories?.edges?.map((e: any) => e.node) || [],
    [data]
  );

  const [favorites, setFavorites] = useState<Array<Repository>>([]);

  console.log("#repositories", repositories);

  const addToFavorites = (repository: Repository) => {
    setFavorites((favs: Array<Repository>) => [...favs, repository]);
  };
  const removeFromFavorites = (repository: Repository) => {
    setFavorites((favs: Array<Repository>) =>
      favs.filter((rep) => rep.id !== repository.id)
    );
  };

  return (
    <>
      <h1>Repositories</h1>
      {repositories.map((repository: Repository) => (
        <article key={repository.id}>
          <a href={repository.url}>{repository.name}</a>
          <button
            disabled={favorites.some((r) => r.id === repository.id)}
            onClick={() => addToFavorites(repository)}
          >
            estrellita
          </button>
        </article>
      ))}

      <h1>Favorite repositories</h1>
      {favorites.map((repository: Repository) => (
        <article key={repository.id}>
          <a href={repository.url}>{repository.name}</a>
          <button onClick={() => removeFromFavorites(repository)}>
            estrellita
          </button>
        </article>
      ))}
    </>
  );
}
