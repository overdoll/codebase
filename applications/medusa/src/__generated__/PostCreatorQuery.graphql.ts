/**
 * @generated SignedSource<<4de4c0c7ae2eab942696ec8936d14b95>>
 * @relayHash 00279dd31a63376a305c940545282aeb
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
<<<<<<< HEAD
/* @relayHash 7474114de940c48e48331f15f73ae380 */
=======
>>>>>>> master

// @relayRequestID 00279dd31a63376a305c940545282aeb

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostState = "DRAFT" | "PUBLISHING" | "REVIEW" | "PUBLISHED" | "DISCARDING" | "DISCARDED" | "REJECTED" | "PROCESSING" | "REMOVING" | "REMOVED" | "%future added value";
export type PostCreatorQuery$variables = {
  reference: string;
  slug: string;
};
export type PostCreatorQueryVariables = PostCreatorQuery$variables;
export type PostCreatorQuery$data = {
  readonly post: {
    readonly __typename: string;
    readonly state: PostState;
    readonly " $fragmentSpreads": FragmentRefs<"UpdatePostFlowFragment">;
  } | null;
  readonly club: {
    readonly id: string;
  } | null;
};
export type PostCreatorQueryResponse = PostCreatorQuery$data;
export type PostCreatorQuery = {
  variables: PostCreatorQueryVariables;
  response: PostCreatorQuery$data;
};

<<<<<<< HEAD


/*
query PostCreatorQuery(
  $reference: String!
  $slug: String!
) {
  post(reference: $reference) {
    __typename
    state
    ...UpdatePostFlowFragment
    id
  }
  club(slug: $slug) {
    id
  }
}

fragment ArrangeUploadsFragment on Post {
  id
  content {
    id
    urls {
      url
    }
    ...DraggableContentFragment
  }
}

fragment ControlledVideoFragment on Resource {
  ...RenderVideoFragment
}

fragment DraggableContentFragment on Resource {
  id
  type
  urls {
    url
    mimeType
  }
  ...ResourceItemFragment
}

fragment ImageSnippetFragment on Resource {
  urls {
    url
    mimeType
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

fragment PostGalleryPublicDetailedFragment on Post {
  id
  reference
  content {
    type
    ...ImageSnippetFragment
    ...ControlledVideoFragment
    id
  }
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

fragment PostReviewFragment on Post {
  reference
  ...PostGalleryPublicDetailedFragment
  ...PostHeaderClubFragment
  ...PostClickableCharactersFragment
  ...PostClickableCategoriesFragment
}

fragment ProcessContentFragment on Post {
  reference
  content {
    processed
    id
  }
}

fragment ProcessUploadsFragment on Post {
  id
  reference
  content {
    id
    urls {
      url
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

fragment SubmitPostButtonFragment on Post {
  id
}

fragment UpdateAudienceButton on Post {
  id
  audience {
    id
  }
}

fragment UpdateCategoryButtonFragment on Post {
  id
  categories {
    id
  }
}

fragment UpdateCharacterButtonFragment on Post {
  id
  characters {
    id
  }
}

fragment UpdateContentButtonFragment on Post {
  id
  content {
    id
    urls {
      url
    }
  }
}

fragment UpdatePostFlowFragment on Post {
  ...UploadFlowHeaderFragment
  ...UploadFlowFooterFragment
  ...UploadCategoryStepFragment
  ...UploadAudienceStepFragment
  ...UploadReviewStepFragment
  ...UploadCharacterStepFragment
  ...UploadArrangeStepFragment
}

fragment UploadArrangeStepFragment on Post {
  content {
    id
    urls {
      url
      mimeType
    }
  }
  ...ArrangeUploadsFragment
  ...ProcessUploadsFragment
}

fragment UploadAudienceStepFragment on Post {
  audience {
    id
    title
  }
}

fragment UploadCategoryStepFragment on Post {
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
      id
    }
  }
}

fragment UploadCharacterStepFragment on Post {
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
      id
    }
  }
}

fragment UploadFlowFooterFragment on Post {
  ...UpdateContentButtonFragment
  ...UpdateAudienceButton
  ...UpdateCategoryButtonFragment
  ...UpdateCharacterButtonFragment
  ...SubmitPostButtonFragment
}

fragment UploadFlowHeaderFragment on Post {
  ...ProcessContentFragment
}

fragment UploadReviewStepFragment on Post {
  ...PostReviewFragment
}

fragment VideoSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}
*/

=======
>>>>>>> master
const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
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
  "args": [
    {
      "kind": "Variable",
      "name": "slug",
      "variableName": "slug"
    }
  ],
  "concreteType": "Club",
  "kind": "LinkedField",
  "name": "club",
  "plural": false,
  "selections": [
    (v4/*: any*/)
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mimeType",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "urls",
  "plural": true,
  "selections": [
    (v6/*: any*/),
    (v7/*: any*/)
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": [
    (v9/*: any*/),
    (v8/*: any*/),
    (v4/*: any*/)
  ],
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
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UpdatePostFlowFragment"
          }
        ],
        "storageKey": null
      },
      (v5/*: any*/)
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
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "processed",
                "storageKey": null
              },
              (v4/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Audience",
            "kind": "LinkedField",
            "name": "audience",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v10/*: any*/)
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
              (v10/*: any*/),
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceUrl",
                    "kind": "LinkedField",
                    "name": "urls",
                    "plural": true,
                    "selections": [
                      (v7/*: any*/),
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
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
              (v12/*: any*/),
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Series",
                "kind": "LinkedField",
                "name": "series",
                "plural": false,
                "selections": [
                  (v10/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v13/*: any*/)
            ],
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
              (v12/*: any*/),
              (v11/*: any*/),
              (v13/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      (v5/*: any*/)
    ]
  },
  "params": {
    "id": "7474114de940c48e48331f15f73ae380",
    "metadata": {},
    "name": "PostCreatorQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "78e74a2b9feb0530dc8af91b86005ae6";

export default node;
