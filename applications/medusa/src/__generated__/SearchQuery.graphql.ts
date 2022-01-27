/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 220277260d16f4f63cd98f94deef665d */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostsSort = "NEW" | "TOP" | "%future added value";
export type SearchQueryVariables = {
    sortBy: PostsSort;
    categorySlugs?: Array<string> | null | undefined;
    seriesSlugs?: Array<string> | null | undefined;
    characterSlugs?: Array<string> | null | undefined;
};
export type SearchQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"PostsInfiniteScrollViewerFragment">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"SearchFragment">;
};
export type SearchQuery = {
    readonly response: SearchQueryResponse;
    readonly variables: SearchQueryVariables;
};



/*
query SearchQuery(
  $sortBy: PostsSort!
  $categorySlugs: [String!]
  $seriesSlugs: [String!]
  $characterSlugs: [String!]
) {
  ...SearchFragment
  viewer {
    ...PostsInfiniteScrollViewerFragment
    id
  }
}

fragment ControlledVideoFragment on Resource {
  ...RenderVideoFragment
}

fragment FullSimplePostFragment on Post {
  id
  ...PostGalleryPublicSimpleFragment
  ...PostMenuFragment
  ...PostLikeButtonFragment
  ...PostHeaderClubFragment
  ...PostClickableCharactersFragment
  ...PostClickableCategoriesFragment
  club {
    ...JoinClubButtonClubFragment
    id
  }
}

fragment FullSimplePostViewerFragment on Account {
  ...JoinClubButtonViewerFragment
}

fragment ImageSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}

fragment JoinClubButtonClubFragment on Club {
  id
  name
  viewerMember {
    __typename
    id
  }
}

fragment JoinClubButtonViewerFragment on Account {
  clubMembershipsLimit
  clubMembershipsCount
}

fragment PostClickableCategoriesFragment on Post {
  categories {
    slug
    title
    thumbnail {
      ...ResourceIconFragment
      id
    }
    id
  }
}

fragment PostClickableCharactersFragment on Post {
  characters {
    name
    slug
    series {
      title
      id
    }
    thumbnail {
      ...ResourceIconFragment
      id
    }
    id
  }
}

fragment PostGalleryPublicSimpleFragment on Post {
  id
  reference
  content {
    type
    ...ImageSnippetFragment
    ...ControlledVideoFragment
    id
  }
  ...PostClickableCategoriesFragment
  ...PostClickableCharactersFragment
}

fragment PostHeaderClubFragment on Post {
  club {
    name
    slug
    thumbnail {
      ...ResourceIconFragment
      id
    }
    id
  }
}

fragment PostLikeButtonFragment on Post {
  id
  viewerLiked {
    __typename
    id
  }
  likes
}

fragment PostMenuFragment on Post {
  id
}

fragment PostsInfiniteScrollFragment on PostConnection {
  edges {
    node {
      ...FullSimplePostFragment
      id
    }
  }
}

fragment PostsInfiniteScrollViewerFragment on Account {
  ...FullSimplePostViewerFragment
}

fragment RenderVideoFragment on Resource {
  urls {
    url
    mimeType
  }
}

fragment ResourceIconFragment on Resource {
  ...ResourceItemFragment
}

fragment ResourceItemFragment on Resource {
  type
  ...ImageSnippetFragment
  ...VideoSnippetFragment
}

fragment SearchFragment on Query {
  posts(first: 5, sortBy: $sortBy, categorySlugs: $categorySlugs, seriesSlugs: $seriesSlugs, characterSlugs: $characterSlugs) {
    edges {
      __typename
      cursor
      node {
        __typename
        id
      }
    }
    ...PostsInfiniteScrollFragment
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment VideoSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "categorySlugs"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "characterSlugs"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "seriesSlugs"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sortBy"
},
v4 = [
  {
    "kind": "Variable",
    "name": "categorySlugs",
    "variableName": "categorySlugs"
  },
  {
    "kind": "Variable",
    "name": "characterSlugs",
    "variableName": "characterSlugs"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  },
  {
    "kind": "Variable",
    "name": "seriesSlugs",
    "variableName": "seriesSlugs"
  },
  {
    "kind": "Variable",
    "name": "sortBy",
    "variableName": "sortBy"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "type",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceUrl",
    "kind": "LinkedField",
    "name": "urls",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "url",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "mimeType",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": (v7/*: any*/),
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v12 = [
  (v5/*: any*/),
  (v6/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PostsInfiniteScrollViewerFragment"
          }
        ],
        "storageKey": null
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "SearchFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "SearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "PostConnection",
        "kind": "LinkedField",
        "name": "posts",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Post",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "reference",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Resource",
                    "kind": "LinkedField",
                    "name": "content",
                    "plural": true,
                    "selections": (v7/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Category",
                    "kind": "LinkedField",
                    "name": "categories",
                    "plural": true,
                    "selections": [
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Character",
                    "kind": "LinkedField",
                    "name": "characters",
                    "plural": true,
                    "selections": [
                      (v11/*: any*/),
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Series",
                        "kind": "LinkedField",
                        "name": "series",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v10/*: any*/),
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PostLike",
                    "kind": "LinkedField",
                    "name": "viewerLiked",
                    "plural": false,
                    "selections": (v12/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "likes",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Club",
                    "kind": "LinkedField",
                    "name": "club",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
                      (v8/*: any*/),
                      (v10/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ClubMember",
                        "kind": "LinkedField",
                        "name": "viewerMember",
                        "plural": false,
                        "selections": (v12/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "filters": [
          "sortBy",
          "categorySlugs",
          "seriesSlugs",
          "characterSlugs"
        ],
        "handle": "connection",
        "key": "SearchPosts_posts",
        "kind": "LinkedHandle",
        "name": "posts"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clubMembershipsLimit",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clubMembershipsCount",
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "220277260d16f4f63cd98f94deef665d",
    "metadata": {},
    "name": "SearchQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'ead2664b4c72a4b2443836b94874accb';
export default node;
