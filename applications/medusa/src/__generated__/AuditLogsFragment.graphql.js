/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { AuditCardFragment$ref } from "./AuditCardFragment.graphql";
import type { FragmentReference } from "relay-runtime";
import type { AuditLogsFragment$ref, AuditLogsFragment$fragmentType } from "./AuditLogsPaginationQuery.graphql";
export type { AuditLogsFragment$ref, AuditLogsFragment$fragmentType };
export type AuditLogsFragment = {|
  +moderatorPostAuditLogs: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +$fragmentRefs: AuditCardFragment$ref
      |}
    |}>
  |},
  +id: string,
  +$refType: AuditLogsFragment$ref,
|};
export type AuditLogsFragment$data = AuditLogsFragment;
export type AuditLogsFragment$key = {
  +$data?: AuditLogsFragment$data,
  +$fragmentRefs: AuditLogsFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = [
  "moderatorPostAuditLogs"
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
    },
    {
      "kind": "RootArgument",
      "name": "from"
    },
    {
      "kind": "RootArgument",
      "name": "to"
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
      "operation": require('./AuditLogsPaginationQuery.graphql.js'),
      "identifierField": "id"
    }
  },
  "name": "AuditLogsFragment",
  "selections": [
    {
      "alias": "moderatorPostAuditLogs",
      "args": [
        {
          "fields": [
            {
              "kind": "Variable",
              "name": "from",
              "variableName": "from"
            },
            {
              "kind": "Variable",
              "name": "to",
              "variableName": "to"
            }
          ],
          "kind": "ObjectValue",
          "name": "dateRange"
        }
      ],
      "concreteType": "PostAuditLogConnection",
      "kind": "LinkedField",
      "name": "__AuditLogs_moderatorPostAuditLogs_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PostAuditLogEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "PostAuditLog",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
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
                  "name": "AuditCardFragment"
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
  "type": "Account",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = '6db86852053df48207963870e14a4cd2';
module.exports = node;
