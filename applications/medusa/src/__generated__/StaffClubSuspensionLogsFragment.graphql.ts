/**
 * @generated SignedSource<<0e87a47f976bf7d810879318f5112be1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubSuspensionLogsFragment$data = {
  readonly id: string;
  readonly suspensionLogs: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id?: string;
        readonly " $fragmentSpreads": FragmentRefs<"StaffClubSuspensionLogFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "StaffClubSuspensionLogsFragment";
};
export type StaffClubSuspensionLogsFragment$key = {
  readonly " $data"?: StaffClubSuspensionLogsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubSuspensionLogsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "suspensionLogs"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 5,
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
      "operation": require('./StaffClubSuspensionLogsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "StaffClubSuspensionLogsFragment",
  "selections": [
    {
      "alias": "suspensionLogs",
      "args": null,
      "concreteType": "ClubSuspensionLogConnection",
      "kind": "LinkedField",
      "name": "__StaffClubSuspensionLogs_suspensionLogs_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ClubSuspensionLogEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "kind": "InlineFragment",
                  "selections": (v2/*: any*/),
                  "type": "ClubIssuedSuspensionLog",
                  "abstractKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": (v2/*: any*/),
                  "type": "ClubRemovedSuspensionLog",
                  "abstractKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "StaffClubSuspensionLogFragment"
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
    (v1/*: any*/)
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "1a4dacf06dd6cf7e0887cf7311779bc4";

export default node;
