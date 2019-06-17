import gql from "graphql-tag";

export default gql`
  {
    songs {
      title,
      keysPlayed {
        note
        time
      }
    }
  }
`;
