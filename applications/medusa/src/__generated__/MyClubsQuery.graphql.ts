/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 62126ec2fa22a28328325f6b85a120e3 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyClubsQueryVariables = {};
export type MyClubsQueryResponse = {
    readonly viewer: {
        readonly clubMembershipsCount: number;
        readonly " $fragmentRefs": FragmentRefs<"SuggestedClubsViewerFragment" | "ClubPostsFeedFragment" | "ClubPostsFeedViewerFragment">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"SuggestedClubsFragment">;
};
export type MyClubsQuery = {
    readonly response: MyClubsQueryResponse;
    readonly variables: MyClubsQueryVariables;
};



/*
query MyClubsQuery {
  ...SuggestedClubsFragment
  viewer {
    ...SuggestedClubsViewerFragment
    ...ClubPostsFeedFragment
    ...ClubPostsFeedViewerFragment
    clubMembershipsCount
    id
  }
}

fragment ClubPostsFeedFragment on Account {
  clubMembersPostsFeed(first: 10) {
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
  id
}

fragment ClubPostsFeedViewerFragment on Account {
  ...PostsInfiniteScrollViewerFragment
}

fragment ControlledVideoFragment on Resource {
  ...RenderVideoFragment
}

fragment FullSimplePostFragment on Post {
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

fragment SuggestedClubsFragment on Query {
  clubs(first: 7) {
    edges {
      node {
        ...JoinClubButtonClubFragment
        thumbnail {
          ...ResourceIconFragment
          id
        }
        name
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment SuggestedClubsViewerFragment on Account {
  ...JoinClubButtonViewerFragment
  clubMembershipsCount
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clubMembershipsCount",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 7
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = [
  (v4/*: any*/),
  (v2/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "ClubMember",
  "kind": "LinkedField",
  "name": "viewerMember",
  "plural": false,
  "selections": (v5/*: any*/),
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
  (v2/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": (v7/*: any*/),
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v10 = {
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
},
v11 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyClubsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SuggestedClubsViewerFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ClubPostsFeedFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ClubPostsFeedViewerFragment"
          }
        ],
        "storageKey": null
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "SuggestedClubsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyClubsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ClubConnection",
        "kind": "LinkedField",
        "name": "clubs",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Club",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v6/*: any*/),
                  (v8/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          (v10/*: any*/)
        ],
        "storageKey": "clubs(first:7)"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "SuggestedClubs_clubs",
        "kind": "LinkedHandle",
        "name": "clubs"
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
          (v0/*: any*/),
          {
            "alias": null,
            "args": (v11/*: any*/),
            "concreteType": "PostConnection",
            "kind": "LinkedField",
            "name": "clubMembersPostsFeed",
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
                  (v4/*: any*/),
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Post",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v2/*: any*/),
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
                          (v12/*: any*/),
                          (v8/*: any*/),
                          (v2/*: any*/)
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
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Series",
                            "kind": "LinkedField",
                            "name": "series",
                            "plural": false,
                            "selections": [
                              (v12/*: any*/),
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v8/*: any*/),
                          (v2/*: any*/)
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
                        "selections": (v5/*: any*/),
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
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "slug",
                            "storageKey": null
                          },
                          (v8/*: any*/),
                          (v2/*: any*/),
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v10/*: any*/)
            ],
            "storageKey": "clubMembersPostsFeed(first:10)"
          },
          {
            "alias": null,
            "args": (v11/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "ClubPostsFeed_clubMembersPostsFeed",
            "kind": "LinkedHandle",
            "name": "clubMembersPostsFeed"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "62126ec2fa22a28328325f6b85a120e3",
    "metadata": {},
    "name": "MyClubsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '424aa03d1afe2a586b73290cc851b045';
export default node;
