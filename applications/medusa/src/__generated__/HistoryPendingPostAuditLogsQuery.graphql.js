/**
 * @flow
 * @relayHash f9188dfb615ff6bfba6490f704b2bda7
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type HistoryPendingPostAuditLogsQueryVariables = {||};
export type HistoryPendingPostAuditLogsQueryResponse = {|
  +pendingPostAuditLogs: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string
      |}
    |}>
  |}
|};
export type HistoryPendingPostAuditLogsQuery = {|
  variables: HistoryPendingPostAuditLogsQueryVariables,
  response: HistoryPendingPostAuditLogsQueryResponse,
|};


/*
query HistoryPendingPostAuditLogsQuery {
  pendingPostAuditLogs(filter: {}) {
    edges {
      node {
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "filter",
        "value": {}
      }
    ],
    "concreteType": "PendingPostAuditLogConnection",
    "kind": "LinkedField",
    "name": "pendingPostAuditLogs",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PendingPostAuditLogEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PendingPostAuditLog",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "pendingPostAuditLogs(filter:{})"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HistoryPendingPostAuditLogsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HistoryPendingPostAuditLogsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "f9188dfb615ff6bfba6490f704b2bda7",
    "metadata": {},
    "name": "HistoryPendingPostAuditLogsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '0b1b7ba0436b84df06c16a2b9bf5dc9e';
module.exports = node;
