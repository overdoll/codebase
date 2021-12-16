/**
 * @flow
 * @relayHash 37213a880e61a7dc9178db8923ec5b70
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { PostStateDraftFragment$ref } from "./PostStateDraftFragment.graphql";
import type { PostStatePublishedFragment$ref } from "./PostStatePublishedFragment.graphql";
import type { PostStateRejectedFragment$ref } from "./PostStateRejectedFragment.graphql";
import type { PostStateReviewFragment$ref } from "./PostStateReviewFragment.graphql";
export type MyPostsQueryVariables = {||};
export type MyPostsQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: PostStateDraftFragment$ref & PostStateReviewFragment$ref & PostStatePublishedFragment$ref & PostStateRejectedFragment$ref
  |}
|};
export type MyPostsQuery = {|
  variables: MyPostsQueryVariables,
  response: MyPostsQueryResponse,
|};


/*
query MyPostsQuery {
  viewer {
    ...PostStateDraftFragment
    ...PostStateReviewFragment
    ...PostStatePublishedFragment
    ...PostStateRejectedFragment
    id
  }
}

fragment PostGalleryContentFragment on Post {
  content {
    type
    urls {
      url
      mimeType
    }
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
  id
  reference
  ...useCheckRequirementsFragment
  content {
    type
    urls {
      url
      mimeType
    }
  }
}

fragment PostStatePublishedFragment on Account {
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
  id
  reference
  postedAt
  content {
    type
    urls {
      url
      mimeType
    }
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
    type
    urls {
      url
      mimeType
    }
  }
}

fragment useCheckRequirementsFragment on Post {
  content {
    __typename
  }
  audience {
    __typename
    id
  }
  brand {
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
var v0 = {
  "kind": "Literal",
  "name": "first",
  "value": 3
},
v1 = [
  (v0/*: any*/),
  {
    "kind": "Literal",
    "name": "state",
    "value": "DRAFT"
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
  "name": "reference",
  "storageKey": null
},
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
v7 = [
  (v4/*: any*/),
  (v2/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v9 = {
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
v10 = [
  "state"
],
v11 = [
  (v0/*: any*/),
  {
    "kind": "Literal",
    "name": "state",
    "value": "REVIEW"
  }
],
v12 = {
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
v13 = [
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
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "postedAt",
            "storageKey": null
          },
          (v12/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      },
      (v8/*: any*/)
    ],
    "storageKey": null
  },
  (v9/*: any*/)
],
v14 = [
  (v0/*: any*/),
  {
    "kind": "Literal",
    "name": "state",
    "value": "PUBLISHED"
  }
],
v15 = [
  (v0/*: any*/),
  {
    "kind": "Literal",
    "name": "state",
    "value": "REJECTED"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyPostsQuery",
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
            "name": "PostStatePublishedFragment"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyPostsQuery",
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
            "alias": "draftPosts",
            "args": (v1/*: any*/),
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
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Resource",
                        "kind": "LinkedField",
                        "name": "content",
                        "plural": true,
                        "selections": [
                          (v4/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/)
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
                        "selections": (v7/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Brand",
                        "kind": "LinkedField",
                        "name": "brand",
                        "plural": false,
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
                        "selections": (v7/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Character",
                        "kind": "LinkedField",
                        "name": "characters",
                        "plural": true,
                        "selections": (v7/*: any*/),
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": "posts(first:3,state:\"DRAFT\")"
          },
          {
            "alias": "draftPosts",
            "args": (v1/*: any*/),
            "filters": (v10/*: any*/),
            "handle": "connection",
            "key": "DraftPostsPaginationQuery_draftPosts",
            "kind": "LinkedHandle",
            "name": "posts"
          },
          (v2/*: any*/),
          {
            "alias": "reviewPosts",
            "args": (v11/*: any*/),
            "concreteType": "PostConnection",
            "kind": "LinkedField",
            "name": "posts",
            "plural": false,
            "selections": (v13/*: any*/),
            "storageKey": "posts(first:3,state:\"REVIEW\")"
          },
          {
            "alias": "reviewPosts",
            "args": (v11/*: any*/),
            "filters": (v10/*: any*/),
            "handle": "connection",
            "key": "ReviewPostsPaginationQuery_reviewPosts",
            "kind": "LinkedHandle",
            "name": "posts"
          },
          {
            "alias": "publishedPosts",
            "args": (v14/*: any*/),
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
                      (v12/*: any*/),
                      (v2/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": "posts(first:3,state:\"PUBLISHED\")"
          },
          {
            "alias": "publishedPosts",
            "args": (v14/*: any*/),
            "filters": (v10/*: any*/),
            "handle": "connection",
            "key": "PublishedPostsPaginationQuery_publishedPosts",
            "kind": "LinkedHandle",
            "name": "posts"
          },
          {
            "alias": "rejectedPosts",
            "args": (v15/*: any*/),
            "concreteType": "PostConnection",
            "kind": "LinkedField",
            "name": "posts",
            "plural": false,
            "selections": (v13/*: any*/),
            "storageKey": "posts(first:3,state:\"REJECTED\")"
          },
          {
            "alias": "rejectedPosts",
            "args": (v15/*: any*/),
            "filters": (v10/*: any*/),
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
    "id": "37213a880e61a7dc9178db8923ec5b70",
    "metadata": {},
    "name": "MyPostsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'b392ab6527a14bd7adaf05528701ac7a';
module.exports = node;
