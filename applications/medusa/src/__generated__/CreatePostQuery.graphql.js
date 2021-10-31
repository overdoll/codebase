/**
 * @flow
 * @relayHash 420ae1eb6462ec8d789a96f8b21a499a
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { UpdatePostFlowFragment$ref } from "./UpdatePostFlowFragment.graphql";
export type CreatePostQueryVariables = {|
  reference: string
|};
export type CreatePostQueryResponse = {|
  +post: ?{|
    +__typename: string
  |},
  +$fragmentRefs: UpdatePostFlowFragment$ref,
|};
export type CreatePostQuery = {|
  variables: CreatePostQueryVariables,
  response: CreatePostQueryResponse,
|};


/*
query CreatePostQuery(
  $reference: String!
) {
  post(reference: $reference) {
    __typename
    id
  }
  ...UpdatePostFlowFragment
}

fragment ArrangeFragment on Query {
  post(reference: $reference) {
    content {
      id
      urls {
        url
        mimeType
      }
    }
    ...ArrangeUploadsFragment
    ...ProcessUploadsFragment
    id
  }
}

fragment ArrangeUploadsFragment on Post {
  content {
    id
    type
    urls {
      url
      mimeType
    }
  }
}

fragment AudienceFragment on Query {
  post(reference: $reference) {
    audience {
      id
      title
    }
    id
  }
  audiences {
    edges {
      node {
        id
        title
        thumbnail {
          type
          urls {
            mimeType
            url
          }
        }
      }
    }
  }
}

fragment BrandFragment on Query {
  post(reference: $reference) {
    brand {
      id
      name
    }
    id
  }
  brands {
    edges {
      node {
        id
        name
        slug
        thumbnail {
          type
          urls {
            mimeType
            url
          }
        }
      }
    }
  }
}

fragment CategoryFragment on Query {
  post(reference: $reference) {
    categories {
      id
      title
      slug
      thumbnail {
        type
        urls {
          mimeType
          url
        }
      }
    }
    id
  }
  ...SearchCategoriesFragment
}

fragment FlowFooterFragment on Query {
  post(reference: $reference) {
    ...FlowForwardButtonFragment
    id
  }
}

fragment FlowForwardButtonFragment on Post {
  id
  content {
    id
  }
  audience {
    id
  }
  brand {
    id
  }
  ...useUpdateContentFragment
  ...useUpdateAudienceFragment
  ...useUpdateBrandFragment
}

fragment FlowStepsFragment on Query {
  ...ArrangeFragment
  ...AudienceFragment
  ...BrandFragment
  ...CategoryFragment
}

fragment ProcessUploadsFragment on Post {
  id
  content {
    urls {
      url
    }
  }
}

fragment SearchCategoriesFragment on Query {
  categories(first: 9) {
    edges {
      node {
        id
        title
        slug
        thumbnail {
          type
          urls {
            mimeType
            url
          }
        }
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

fragment UpdatePostFlowFragment on Query {
  ...FlowStepsFragment
  ...FlowFooterFragment
}

fragment useUpdateAudienceFragment on Post {
  id
}

fragment useUpdateBrandFragment on Post {
  id
}

fragment useUpdateContentFragment on Post {
  id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "reference",
    "variableName": "reference"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mimeType",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
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
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": [
    (v6/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ResourceUrl",
      "kind": "LinkedField",
      "name": "urls",
      "plural": true,
      "selections": [
        (v5/*: any*/),
        (v4/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v11 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 9
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreatePostQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "UpdatePostFlowFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreatePostQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceUrl",
                "kind": "LinkedField",
                "name": "urls",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
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
            "selections": [
              (v3/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Brand",
            "kind": "LinkedField",
            "name": "brand",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v8/*: any*/)
            ],
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
              (v3/*: any*/),
              (v7/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AudienceConnection",
        "kind": "LinkedField",
        "name": "audiences",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AudienceEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Audience",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v7/*: any*/),
                  (v10/*: any*/)
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
        "concreteType": "BrandConnection",
        "kind": "LinkedField",
        "name": "brands",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "BrandEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Brand",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/)
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
        "args": (v11/*: any*/),
        "concreteType": "CategoryConnection",
        "kind": "LinkedField",
        "name": "categories",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CategoryEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Category",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v7/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
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
        "storageKey": "categories(first:9)"
      },
      {
        "alias": null,
        "args": (v11/*: any*/),
        "filters": [
          "title"
        ],
        "handle": "connection",
        "key": "SearchCategories_categories",
        "kind": "LinkedHandle",
        "name": "categories"
      }
    ]
  },
  "params": {
    "id": "420ae1eb6462ec8d789a96f8b21a499a",
    "metadata": {},
    "name": "CreatePostQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'dbaf32af9039c5e8eb8565f55faadd5e';
module.exports = node;
