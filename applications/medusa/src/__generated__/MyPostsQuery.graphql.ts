/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 4be24943284bcb50c7c34d5883728a29 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyPostsQueryVariables = {
    slug: string;
};
export type MyPostsQueryResponse = {
    readonly club: {
        readonly " $fragmentRefs": FragmentRefs<"PostStatePublishedFragment">;
    } | null;
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"PostStateDraftFragment" | "PostStateReviewFragment" | "PostStateRejectedFragment">;
    } | null;
};
export type MyPostsQuery = {
    readonly response: MyPostsQueryResponse;
    readonly variables: MyPostsQueryVariables;
};



/*
query MyPostsQuery(
  $slug: String!
) {
  club(slug: $slug) {
    ...PostStatePublishedFragment
    id
  }
  viewer {
    ...PostStateDraftFragment
    ...PostStateReviewFragment
    ...PostStateRejectedFragment
    id
  }
}

fragment ImageSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}

fragment PostGalleryContentFragment on Post {
  content {
    type
    ...ImageSnippetFragment
    ...VideoSnippetFragment
  }
}

fragment PostStateDraftFragment on Account {
  draftPosts: posts(first: 3, state: DRAFT) {
    edges {
      node {
        ...PostStateDraftPreviewFragment
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
  id
}

fragment PostStateDraftPreviewFragment on Post {
  reference
  content {
    ...ResourceItemFragment
  }
  ...checkPostRequirementsFragment
}

fragment PostStatePublishedFragment on Club {
  publishedPosts: posts(first: 3, state: PUBLISHED) {
    edges {
      node {
        ...PostStatePublishedPreviewFragment
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
  id
}

fragment PostStatePublishedPreviewFragment on Post {
  reference
  ...PostGalleryContentFragment
}

fragment PostStateRejectedFragment on Account {
  rejectedPosts: posts(first: 3, state: REJECTED) {
    edges {
      node {
        ...PostStateRejectedPreviewFragment
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
  id
}

fragment PostStateRejectedPreviewFragment on Post {
  postedAt
  content {
    ...ResourceItemFragment
  }
}

fragment PostStateReviewFragment on Account {
  reviewPosts: posts(first: 3, state: REVIEW) {
    edges {
      node {
        ...PostStateReviewPreviewFragment
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
  id
}

fragment PostStateReviewPreviewFragment on Post {
  id
  reference
  postedAt
  content {
    ...ResourceItemFragment
  }
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

fragment checkPostRequirementsFragment on Post {
  content {
    __typename
  }
  audience {
    __typename
    id
  }
  categories {
    __typename
    id
  }
  characters {
    __typename
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = {
  "kind": "Literal",
  "name": "first",
  "value": 3
},
v3 = [
  (v2/*: any*/),
  {
    "kind": "Literal",
    "name": "state",
    "value": "PUBLISHED"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v6 = {
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
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "content",
  "plural": true,
  "selections": [
    (v5/*: any*/),
    (v6/*: any*/)
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v11 = {
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
v12 = [
  "state"
],
v13 = [
  (v2/*: any*/),
  {
    "kind": "Literal",
    "name": "state",
    "value": "DRAFT"
  }
],
v14 = [
  (v9/*: any*/),
  (v8/*: any*/)
],
v15 = [
  (v2/*: any*/),
  {
    "kind": "Literal",
    "name": "state",
    "value": "REVIEW"
  }
],
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postedAt",
  "storageKey": null
},
v17 = [
  (v2/*: any*/),
  {
    "kind": "Literal",
    "name": "state",
    "value": "REJECTED"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MyPostsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PostStatePublishedFragment"
          }
        ],
        "storageKey": null
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "PostStateDraftFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PostStateReviewFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PostStateRejectedFragment"
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
    "name": "MyPostsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          {
            "alias": "publishedPosts",
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Post",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              (v11/*: any*/)
            ],
            "storageKey": "posts(first:3,state:\"PUBLISHED\")"
          },
          {
            "alias": "publishedPosts",
            "args": (v3/*: any*/),
            "filters": (v12/*: any*/),
            "handle": "connection",
            "key": "PublishedPostsPaginationQuery_publishedPosts",
            "kind": "LinkedHandle",
            "name": "posts"
          },
          (v8/*: any*/)
        ],
        "storageKey": null
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
            "alias": "draftPosts",
            "args": (v13/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Post",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Resource",
                        "kind": "LinkedField",
                        "name": "content",
                        "plural": true,
                        "selections": [
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Audience",
                        "kind": "LinkedField",
                        "name": "audience",
                        "plural": false,
                        "selections": (v14/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Category",
                        "kind": "LinkedField",
                        "name": "categories",
                        "plural": true,
                        "selections": (v14/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Character",
                        "kind": "LinkedField",
                        "name": "characters",
                        "plural": true,
                        "selections": (v14/*: any*/),
                        "storageKey": null
                      },
                      (v8/*: any*/),
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              (v11/*: any*/)
            ],
            "storageKey": "posts(first:3,state:\"DRAFT\")"
          },
          {
            "alias": "draftPosts",
            "args": (v13/*: any*/),
            "filters": (v12/*: any*/),
            "handle": "connection",
            "key": "DraftPostsPaginationQuery_draftPosts",
            "kind": "LinkedHandle",
            "name": "posts"
          },
          (v8/*: any*/),
          {
            "alias": "reviewPosts",
            "args": (v15/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Post",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v4/*: any*/),
                      (v16/*: any*/),
                      (v7/*: any*/),
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              (v11/*: any*/)
            ],
            "storageKey": "posts(first:3,state:\"REVIEW\")"
          },
          {
            "alias": "reviewPosts",
            "args": (v15/*: any*/),
            "filters": (v12/*: any*/),
            "handle": "connection",
            "key": "ReviewPostsPaginationQuery_reviewPosts",
            "kind": "LinkedHandle",
            "name": "posts"
          },
          {
            "alias": "rejectedPosts",
            "args": (v17/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Post",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v16/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              (v11/*: any*/)
            ],
            "storageKey": "posts(first:3,state:\"REJECTED\")"
          },
          {
            "alias": "rejectedPosts",
            "args": (v17/*: any*/),
            "filters": (v12/*: any*/),
            "handle": "connection",
            "key": "RejectedPostsPaginationQuery_rejectedPosts",
            "kind": "LinkedHandle",
            "name": "posts"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "4be24943284bcb50c7c34d5883728a29",
    "metadata": {},
    "name": "MyPostsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'e3df5b14da841beb72343c27b7e84876';
export default node;
