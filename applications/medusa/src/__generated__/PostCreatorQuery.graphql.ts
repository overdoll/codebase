/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 9c4fe56c2b3bc039a3cd1f62f32db5f3 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostState = "DISCARDED" | "DISCARDING" | "DRAFT" | "PROCESSING" | "PUBLISHED" | "PUBLISHING" | "REJECTED" | "REMOVED" | "REMOVING" | "REVIEW" | "%future added value";
export type PostCreatorQueryVariables = {
    reference: string;
};
export type PostCreatorQueryResponse = {
    readonly post: {
        readonly __typename: string;
        readonly state: PostState;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"UpdatePostFlowFragment">;
};
export type PostCreatorQuery = {
    readonly response: PostCreatorQueryResponse;
    readonly variables: PostCreatorQueryVariables;
};



/*
query PostCreatorQuery(
  $reference: String!
) {
  post(reference: $reference) {
    __typename
    state
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
}

fragment CharacterFragment on Query {
  post(reference: $reference) {
    characters {
      id
      name
      series {
        title
        id
      }
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
  categories {
    id
  }
  characters {
    id
  }
  ...useUpdateContentFragment
  ...useUpdateAudienceFragment
  ...useUpdateBrandFragment
  ...useUpdateCategoryFragment
  ...useUpdateCharacterFragment
  ...useSubmitPostFragment
}

fragment FlowHeaderFragment on Query {
  post(reference: $reference) {
    id
    ...useCheckRequirementsFragment
  }
}

fragment FlowStepsFragment on Query {
  ...ArrangeFragment
  ...AudienceFragment
  ...BrandFragment
  ...CategoryFragment
  ...CharacterFragment
  ...ReviewFragment
}

fragment PostBrandFragment on Post {
  brand {
    name
    thumbnail {
      type
      urls {
        mimeType
        url
      }
    }
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

fragment ProcessUploadsFragment on Post {
  id
  reference
  content {
    urls {
      url
    }
  }
}

fragment ReviewFragment on Query {
  post(reference: $reference) {
    id
    content {
      urls {
        url
        mimeType
      }
    }
    ...PostGalleryContentFragment
    ...PostBrandFragment
  }
}

fragment UpdatePostFlowFragment on Query {
  ...FlowStepsFragment
  ...FlowFooterFragment
  ...FlowHeaderFragment
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

fragment useSubmitPostFragment on Post {
  id
}

fragment useUpdateAudienceFragment on Post {
  id
}

fragment useUpdateBrandFragment on Post {
  id
}

fragment useUpdateCategoryFragment on Post {
  id
}

fragment useUpdateCharacterFragment on Post {
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
  "name": "state",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mimeType",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
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
  "kind": "ScalarField",
  "name": "name",
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
    (v7/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ResourceUrl",
      "kind": "LinkedField",
      "name": "urls",
      "plural": true,
      "selections": [
        (v6/*: any*/),
        (v5/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PostCreatorQuery",
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
          (v3/*: any*/)
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
    "name": "PostCreatorQuery",
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
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceUrl",
                "kind": "LinkedField",
                "name": "urls",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v7/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
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
            "concreteType": "Audience",
            "kind": "LinkedField",
            "name": "audience",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v8/*: any*/),
              (v2/*: any*/)
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
              (v4/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v2/*: any*/)
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
              (v4/*: any*/),
              (v8/*: any*/),
              (v11/*: any*/),
              (v10/*: any*/),
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
              (v4/*: any*/),
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Series",
                "kind": "LinkedField",
                "name": "series",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v11/*: any*/),
              (v10/*: any*/),
              (v2/*: any*/)
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
                  (v4/*: any*/),
                  (v8/*: any*/),
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
                  (v4/*: any*/),
                  (v9/*: any*/),
                  (v11/*: any*/),
                  (v10/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "9c4fe56c2b3bc039a3cd1f62f32db5f3",
    "metadata": {},
    "name": "PostCreatorQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '9149acd65bf41d9d5c413dd65bbf3700';
export default node;
