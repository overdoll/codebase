/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SuggestedClubsFragment = {
    readonly clubs: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly slug: string;
                readonly posts: {
                    readonly edges: ReadonlyArray<{
                        readonly node: {
                            readonly content: ReadonlyArray<{
                                readonly " $fragmentRefs": FragmentRefs<"ResourceItemFragment">;
                            }>;
                        };
                    }>;
                };
                readonly thumbnail: {
                    readonly " $fragmentRefs": FragmentRefs<"ResourceIconFragment">;
                } | null;
                readonly name: string;
                readonly " $fragmentRefs": FragmentRefs<"JoinClubButtonClubFragment">;
            };
        }>;
    };
    readonly " $refType": "SuggestedClubsFragment";
};
export type SuggestedClubsFragment$data = SuggestedClubsFragment;
export type SuggestedClubsFragment$key = {
    readonly " $data"?: SuggestedClubsFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SuggestedClubsFragment">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "clubs"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 7,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./SuggestedClubsPaginationQuery.graphql.ts')
    }
  },
  "name": "SuggestedClubsFragment",
  "selections": [
    {
      "alias": "clubs",
      "args": null,
      "concreteType": "ClubConnection",
      "kind": "LinkedField",
      "name": "__SuggestedClubs_clubs_connection",
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
                  "name": "slug",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "first",
                      "value": 1
                    }
                  ],
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
                  "alias": null,
                  "args": null,
                  "concreteType": "Resource",
                  "kind": "LinkedField",
                  "name": "thumbnail",
                  "plural": false,
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "ResourceIconFragment"
                    }
                  ],
                  "storageKey": null
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
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
(node as any).hash = '84173363a2cc00f9831ded492c18c87f';
export default node;
