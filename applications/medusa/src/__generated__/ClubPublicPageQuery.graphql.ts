/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash e2dc9cbaa774a9b16988743a19ff1f48 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ClubPublicPageQueryVariables = {
    slug: string;
};
export type ClubPublicPageQueryResponse = {
    readonly club: {
        readonly membersCount: number;
        readonly members: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly account: {
                        readonly avatar: {
                            readonly " $fragmentRefs": FragmentRefs<"ResourceIconFragment">;
                        } | null;
                    };
                };
            }>;
        };
        readonly backgroundPost: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly content: ReadonlyArray<{
                        readonly " $fragmentRefs": FragmentRefs<"ResourceItemFragment">;
                    }>;
                };
            }>;
        };
        readonly " $fragmentRefs": FragmentRefs<"LargeClubHeaderFragment" | "JoinClubButtonClubFragment">;
    } | null;
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"JoinClubButtonViewerFragment">;
    } | null;
};
export type ClubPublicPageQuery = {
    readonly response: ClubPublicPageQueryResponse;
    readonly variables: ClubPublicPageQueryVariables;
};



/*
query ClubPublicPageQuery(
  $slug: String!
) {
  club(slug: $slug) {
    membersCount
    members(first: 4, sortBy: NEWEST) {
      edges {
        node {
          account {
            avatar {
              ...ResourceIconFragment
              id
            }
            id
          }
          id
        }
      }
    }
    backgroundPost: posts(first: 1) {
      edges {
        node {
          content {
            ...ResourceItemFragment
            id
          }
          id
        }
      }
    }
    ...LargeClubHeaderFragment
    ...JoinClubButtonClubFragment
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "membersCount",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 4
  },
  {
    "kind": "Literal",
    "name": "sortBy",
    "value": "NEWEST"
  }
],
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ClubPublicPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "ClubMemberConnection",
            "kind": "LinkedField",
            "name": "members",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ClubMemberEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ClubMember",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Account",
                        "kind": "LinkedField",
                        "name": "account",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Resource",
                            "kind": "LinkedField",
                            "name": "avatar",
                            "plural": false,
                            "selections": [
                              {
                                "args": null,
                                "kind": "FragmentSpread",
                                "name": "ResourceIconFragment"
                              }
                            ],
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
              }
            ],
            "storageKey": "members(first:4,sortBy:\"NEWEST\")"
          },
          {
            "alias": "backgroundPost",
            "args": (v4/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Resource",
                        "kind": "LinkedField",
                        "name": "content",
                        "plural": true,
                        "selections": [
                          {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "ResourceItemFragment"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "posts(first:1)"
          },
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
    "name": "ClubPublicPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "ClubMemberConnection",
            "kind": "LinkedField",
            "name": "members",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ClubMemberEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ClubMember",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Account",
                        "kind": "LinkedField",
                        "name": "account",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Resource",
                            "kind": "LinkedField",
                            "name": "avatar",
                            "plural": false,
                            "selections": (v6/*: any*/),
                            "storageKey": null
                          },
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "members(first:4,sortBy:\"NEWEST\")"
          },
          {
            "alias": "backgroundPost",
            "args": (v4/*: any*/),
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
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "posts(first:1)"
          },
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
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "thumbnail",
            "plural": false,
            "selections": (v6/*: any*/),
            "storageKey": null
          },
          (v5/*: any*/),
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
              (v5/*: any*/)
            ],
            "storageKey": null
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
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "e2dc9cbaa774a9b16988743a19ff1f48",
    "metadata": {},
    "name": "ClubPublicPageQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '5dff4a8021bf4a0cef44b002dbaf77c4';
export default node;
