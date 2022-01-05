/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash aeee16d402c5063f8a1671887b8eb897 */

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
        readonly " $fragmentRefs": FragmentRefs<"UpdatePostFlowFragment">;
    } | null;
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
    ...UpdatePostFlowFragment
    id
  }
}

fragment ArrangeFragment on Post {
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

fragment ArrangeUploadsFragment on Post {
  content {
    id
    urls {
      url
    }
    ...DraggableContentFragment
  }
}

fragment AudienceFragment on Post {
  audience {
    id
    title
  }
}

fragment CategoryFragment on Post {
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
}

fragment CharacterFragment on Post {
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
}

fragment ClubPreviewFragment on Club {
  name
  slug
  thumbnail {
    ...ResourceIconFragment
  }
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

fragment FlowFooterFragment on Post {
  ...FlowForwardButtonFragment
}

fragment FlowForwardButtonFragment on Post {
  ...SubmitPostButtonFragment
  ...UpdateAudienceButton
  ...UpdateCategoryButtonFragment
  ...UpdateCharacterButtonFragment
  ...UpdateContentButtonFragment
}

fragment FlowHeaderFragment on Post {
  ...checkPostRequirementsFragment
  club {
    ...ClubPreviewFragment
    id
  }
}

fragment FlowStepsFragment on Post {
  ...ArrangeFragment
  ...AudienceFragment
  ...CategoryFragment
  ...CharacterFragment
  ...ReviewFragment
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

fragment PostHeaderClubFragment on Post {
  club {
    name
    thumbnail {
      ...ResourceIconFragment
    }
    id
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

fragment ResourceIconFragment on Resource {
  ...ResourceItemFragment
}

fragment ResourceItemFragment on Resource {
  type
  ...ImageSnippetFragment
  ...VideoSnippetFragment
}

fragment ReviewFragment on Post {
  id
  content {
    urls {
      url
      mimeType
    }
  }
  ...PostGalleryContentFragment
  ...PostHeaderClubFragment
  club {
    name
    id
  }
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
    urls {
      url
    }
  }
}

fragment UpdatePostFlowFragment on Post {
  ...FlowStepsFragment
  ...FlowFooterFragment
  ...FlowHeaderFragment
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
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
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
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": [
    (v8/*: any*/),
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
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
          {
            "alias": null,
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
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
            "concreteType": "Audience",
            "kind": "LinkedField",
            "name": "audience",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v9/*: any*/),
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
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
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
              (v12/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Series",
                "kind": "LinkedField",
                "name": "series",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v10/*: any*/),
              (v11/*: any*/),
              (v2/*: any*/)
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
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/),
              (v10/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "aeee16d402c5063f8a1671887b8eb897",
    "metadata": {},
    "name": "PostCreatorQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '14f11d6a2a1ecd50e8f3d2c6a29fddb6';
export default node;