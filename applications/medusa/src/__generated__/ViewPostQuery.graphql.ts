/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash c4fccef49b827d1d4b98b3b612440774 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewPostQueryVariables = {
    reference: string;
};
export type ViewPostQueryResponse = {
    readonly post: {
        readonly club: {
            readonly " $fragmentRefs": FragmentRefs<"LargeClubHeaderFragment" | "JoinClubButtonClubFragment">;
        };
        readonly " $fragmentRefs": FragmentRefs<"PostGalleryContentFragment" | "PostClickableCategoriesFragment" | "PostClickableCharactersFragment">;
    } | null;
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"JoinClubButtonViewerFragment">;
    } | null;
};
export type ViewPostQuery = {
    readonly response: ViewPostQueryResponse;
    readonly variables: ViewPostQueryVariables;
};



/*
query ViewPostQuery(
  $reference: String!
) {
  post(reference: $reference) {
    ...PostGalleryContentFragment
    ...PostClickableCategoriesFragment
    ...PostClickableCharactersFragment
    club {
      ...LargeClubHeaderFragment
      ...JoinClubButtonClubFragment
      id
    }
    id
  }
  viewer {
    ...JoinClubButtonViewerFragment
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

fragment JoinClubButtonViewerFragment on Account {
  clubMembershipsLimit
  clubMembershipsCount
}

fragment LargeClubHeaderFragment on Club {
  name
  thumbnail {
    ...ResourceIconFragment
    id
  }
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

fragment PostGalleryContentFragment on Post {
  content {
    type
    ...ImageSnippetFragment
    ...VideoSnippetFragment
    id
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
  "name": "id",
  "storageKey": null
},
v3 = [
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v6 = {
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
    "name": "ViewPostQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Club",
            "kind": "LinkedField",
            "name": "club",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "LargeClubHeaderFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "JoinClubButtonClubFragment"
              }
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PostGalleryContentFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PostClickableCategoriesFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PostClickableCharactersFragment"
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
            "name": "JoinClubButtonViewerFragment"
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
    "name": "ViewPostQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": (v3/*: any*/),
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
              (v5/*: any*/),
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
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Series",
                "kind": "LinkedField",
                "name": "series",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/),
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
              (v6/*: any*/),
              (v5/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ClubMember",
                "kind": "LinkedField",
                "name": "viewerMember",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
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
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "c4fccef49b827d1d4b98b3b612440774",
    "metadata": {},
    "name": "ViewPostQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '3c5e45b86b28dbd8d2cc7c6495d553f3';
export default node;
