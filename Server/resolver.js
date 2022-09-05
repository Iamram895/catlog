// const mocks = {
//     Query: () => ({
//       tracksForHome: () => [...new Array(6)]
//     }),
//     Track: () => ({
//       id: () => 'track_01',
//       title: () => 'Astro Kitty, Space Explorer',
//       author: () => {
//         return {
//           name: 'Grumpy Cat',
//           photo:
//             'https://res.cloudinary.com/dety84pbu/image/upload/v1606816219/kitty-veyron-sm_mctf3c.jpg'
//         };
//       },
//       thumbnail: () =>
//         'https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg',
//       length: () => 1210,
//       modulesCount: () => 6
//     })
//   };
//   module.exports=mocks

const resolvers = {
  Query: {
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },

    // get a single track by ID, for the track page

    track: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    },
  },
  Track: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },
    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(id);
    },
  },

  Mutation: {
    // increments a track's numberOfViews property
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
  },
};

module.exports = resolvers;
