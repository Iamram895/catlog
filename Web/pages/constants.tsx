import { gql } from "graphql-tag";

const getQuery = gql`
  query {
    tracksForHome {
      id
      title
      author {
        name
        photo
      }
      thumbnail
      length
      modulesCount
    }
  }
`;
const GET_TRACK = gql`
  query GetTrack($trackId: ID!) {
    track(id: $trackId) {
      id
      title
      author {
        id
        name
        photo
      }
      thumbnail
      length
      modulesCount
      numberOfViews
      modules {
        id
        title
        length
      }
      description
    }
  }
`;
/**
 * Mutation to increment a track's number of views
 */
const INCREMENT_TRACK_VIEWS = gql`
  mutation IncrementTrackViews($incrementTrackViewsId: ID!) {
    incrementTrackViews(id: $incrementTrackViewsId) {
      code
      success
      message
      track {
        id
        numberOfViews
      }
    }
  }
`;

export { getQuery, GET_TRACK, INCREMENT_TRACK_VIEWS };
