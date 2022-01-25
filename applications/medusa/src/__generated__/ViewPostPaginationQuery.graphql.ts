/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 20a6138301df2660de3c48b3787f125f */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewPostPaginationQueryVariables = {
    after?: string | null | undefined;
    first?: number | null | undefined;
    id: string;
};
export type ViewPostPaginationQueryResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"PublicPostFragment">;
    } | null;
};
export type ViewPostPaginationQuery = {
    readonly response: ViewPostPaginationQueryResponse;
    readonly variables: ViewPostPaginationQueryVariables;
};



/*
query ViewPostPaginationQuery(
  $after: String
  $first: Int = 10
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...PublicPostFragment_2HEEH6
    id
  }
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

fragment PublicPostFragment_2HEEH6 on Post {
  suggestedPosts(first: $first, after: $after) {
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

fragment VideoSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": 10,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
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
  (v4/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = [
  (v3/*: any*/),
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewPostPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": (v2/*: any*/),
            "kind": "FragmentSpread",
            "name": "PublicPostFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ViewPostPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v2/*: any*/),
                "concreteType": "PostConnection",
                "kind": "LinkedField",
                "name": "suggestedPosts",
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
                      (v3/*: any*/),
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
                          (v3/*: any*/),
                          (v4/*: any*/),
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
                            "selections": (v5/*: any*/),
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
                              (v6/*: any*/),
                              (v7/*: any*/),
                              (v8/*: any*/),
                              (v4/*: any*/)
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
                              (v9/*: any*/),
                              (v6/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Series",
                                "kind": "LinkedField",
                                "name": "series",
                                "plural": false,
                                "selections": [
                                  (v7/*: any*/),
                                  (v4/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v8/*: any*/),
                              (v4/*: any*/)
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
                            "selections": (v10/*: any*/),
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
                              (v9/*: any*/),
                              (v6/*: any*/),
                              (v8/*: any*/),
                              (v4/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ClubMember",
                                "kind": "LinkedField",
                                "name": "viewerMember",
                                "plural": false,
                                "selections": (v10/*: any*/),
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
                "args": (v2/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "ViewPost_suggestedPosts",
                "kind": "LinkedHandle",
                "name": "suggestedPosts"
              }
            ],
            "type": "Post",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "20a6138301df2660de3c48b3787f125f",
    "metadata": {},
    "name": "ViewPostPaginationQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '2637b02c8a7f2f31d1cde9a992e6f847';
export default node;
