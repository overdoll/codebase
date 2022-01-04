/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash a378f32bc094f6778ddce030cd2d7f1b */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ManageClubsPaginationFragmentVariables = {
    after?: string | null | undefined;
    first?: number | null | undefined;
    name?: string | null | undefined;
    id: string;
};
export type ManageClubsPaginationFragmentResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"MyClubsFragment">;
    } | null;
};
export type ManageClubsPaginationFragment = {
    readonly response: ManageClubsPaginationFragmentResponse;
    readonly variables: ManageClubsPaginationFragmentVariables;
};



/*
query ManageClubsPaginationFragment(
  $after: String
  $first: Int = 3
  $name: String
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...MyClubsFragment_3cTRis
    id
  }
}

fragment ClubPreviewFragment on Club {
  name
  slug
  thumbnail {
    ...ResourceIconFragment
  }
}

fragment ImageSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}

fragment MyClubsFragment_3cTRis on Account {
  clubs(first: $first, after: $after, name: $name) {
    edges {
      node {
        ...ClubPreviewFragment
        slug
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": 3,
  "kind": "LocalArgument",
  "name": "first"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v5 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "name"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ManageClubsPaginationFragment",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": (v5/*: any*/),
            "kind": "FragmentSpread",
            "name": "MyClubsFragment"
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ManageClubsPaginationFragment",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v5/*: any*/),
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "slug",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Resource",
                            "kind": "LinkedField",
                            "name": "thumbnail",
                            "plural": false,
                            "selections": [
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
                              }
                            ],
                            "storageKey": null
                          },
                          (v7/*: any*/),
                          (v6/*: any*/)
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
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "filters": [
                  "name"
                ],
                "handle": "connection",
                "key": "ManageClubs_clubs",
                "kind": "LinkedHandle",
                "name": "clubs"
              }
            ],
            "type": "Account",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "a378f32bc094f6778ddce030cd2d7f1b",
    "metadata": {},
    "name": "ManageClubsPaginationFragment",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '6e158293faba83fa2bf1e6ecaf0263aa';
export default node;
