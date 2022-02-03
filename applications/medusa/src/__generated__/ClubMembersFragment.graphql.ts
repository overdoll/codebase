/**
 * @generated SignedSource<<4bd592c3524c6fa83338a26327aa0c7a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
<<<<<<< HEAD
export type ClubMembersFragment = {
    readonly members: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly account: {
                    readonly username: string;
                    readonly " $fragmentRefs": FragmentRefs<"AccountTileOverlayFragment">;
                };
            };
        }>;
    };
    readonly id: string;
    readonly " $refType": "ClubMembersFragment";
=======
export type ClubMembersFragment$data = {
  readonly members: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly account: {
          readonly " $fragmentSpreads": FragmentRefs<"AccountTileOverlayFragment">;
        };
      };
    }>;
  };
  readonly id: string;
  readonly " $fragmentType": "ClubMembersFragment";
>>>>>>> master
};
export type ClubMembersFragment = ClubMembersFragment$data;
export type ClubMembersFragment$key = {
  readonly " $data"?: ClubMembersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubMembersFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "members"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 20,
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
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./ClubMembersPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "ClubMembersFragment",
  "selections": [
    {
      "alias": "members",
      "args": null,
      "concreteType": "ClubMemberConnection",
      "kind": "LinkedField",
      "name": "__ClubMembers_members_connection",
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
                      "kind": "ScalarField",
                      "name": "username",
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "AccountTileOverlayFragment"
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};
})();
<<<<<<< HEAD
(node as any).hash = '7622691bee99e7d5157d6230324c3c06';
=======

(node as any).hash = "f7105a5a40e51637b712f4af01545393";

>>>>>>> master
export default node;
