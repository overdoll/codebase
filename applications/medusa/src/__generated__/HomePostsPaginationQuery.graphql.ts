/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash ac17bc24120fed0e522dcccd7245af0e */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomePostsPaginationQueryVariables = {
    after?: string | null | undefined;
    first?: number | null | undefined;
};
export type HomePostsPaginationQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"HomeFragment">;
};
export type HomePostsPaginationQuery = {
    readonly response: HomePostsPaginationQueryResponse;
    readonly variables: HomePostsPaginationQueryVariables;
};



/*
query HomePostsPaginationQuery(
  $after: String
  $first: Int = 5
) {
  ...HomeFragment_2HEEH6
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

fragment HomeFragment_2HEEH6 on Query {
  posts(first: $first, after: $after, sortBy: TOP) {
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
    "defaultValue": 5,
    "kind": "LocalArgument",
    "name": "first"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/),
  {
    "kind": "Literal",
    "name": "sortBy",
    "value": "TOP"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
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
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v11 = [
  (v4/*: any*/),
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HomePostsPaginationQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "HomeFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HomePostsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
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
              (v4/*: any*/),
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
                  (v4/*: any*/),
                  (v5/*: any*/),
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
                    "selections": (v6/*: any*/),
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
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v5/*: any*/)
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
                      (v10/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Series",
                        "kind": "LinkedField",
                        "name": "series",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v9/*: any*/),
                      (v5/*: any*/)
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
                    "selections": (v11/*: any*/),
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
                      (v10/*: any*/),
                      (v7/*: any*/),
                      (v9/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ClubMember",
                        "kind": "LinkedField",
                        "name": "viewerMember",
                        "plural": false,
                        "selections": (v11/*: any*/),
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
        "args": (v3/*: any*/),
        "filters": [
          "sortBy"
        ],
        "handle": "connection",
        "key": "HomePosts_posts",
        "kind": "LinkedHandle",
        "name": "posts"
      }
    ]
  },
  "params": {
    "id": "ac17bc24120fed0e522dcccd7245af0e",
    "metadata": {},
    "name": "HomePostsPaginationQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '63c4df90fd370bffb939bd5b6c4ee01d';
export default node;
