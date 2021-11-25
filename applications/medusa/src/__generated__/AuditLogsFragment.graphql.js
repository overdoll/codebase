/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { AuditCardFragment$ref } from "./AuditCardFragment.graphql";
import type { AuditInspectFragment$ref } from "./AuditInspectFragment.graphql";
import type { FragmentReference } from "relay-runtime";
import type { AuditLogsFragment$ref, AuditLogsFragment$fragmentType } from "./AuditLogsPaginationQuery.graphql";
export type { AuditLogsFragment$ref, AuditLogsFragment$fragmentType };
export type AuditLogsFragment = {|
  +moderatorPostAuditLogs: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +$fragmentRefs: AuditCardFragment$ref & AuditInspectFragment$ref
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
<<<<<<< HEAD
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
=======
          "kind": "Literal",
          "name": "dateRange",
          "value": {
            "from": 0,
            "to": 0
          }
>>>>>>> master
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
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "AuditInspectFragment"
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
      "storageKey": "__AuditLogs_moderatorPostAuditLogs_connection(dateRange:{\"from\":0,\"to\":0})"
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
<<<<<<< HEAD
(node: any).hash = '2a7defa328f720c02ce519209fd2ec32';
=======
(node: any).hash = '9ee7e0baa40cec68cbced30acbca8b46';
>>>>>>> master
module.exports = node;
