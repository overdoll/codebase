/**
 * @generated SignedSource<<eb7d110ca52e4291d439f615a5ca2cc6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubSuspensionLogsFragment$data = {
  readonly suspensionLogs: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"StaffClubSuspensionLogFragment">;
      };
    }>;
  };
  readonly id: string;
  readonly " $fragmentType": "StaffClubSuspensionLogsFragment";
};
export type StaffClubSuspensionLogsFragment = StaffClubSuspensionLogsFragment$data;
export type StaffClubSuspensionLogsFragment$key = {
  readonly " $data"?: StaffClubSuspensionLogsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubSuspensionLogsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "suspensionLogs"
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

(node as any).hash = "a5a83589d9474f8f818ad50781f50b20";

export default node;
