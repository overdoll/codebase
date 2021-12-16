/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash dcb46663ed45d0d4edb35941026f4a66 */

import { ConcreteRequest } from "relay-runtime";
export type QueueSettingsQueryVariables = {};
export type QueueSettingsQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly moderatorSettings: {
            readonly isInModeratorQueue: boolean;
        };
    } | null;
};
export type QueueSettingsQuery = {
    readonly response: QueueSettingsQueryResponse;
    readonly variables: QueueSettingsQueryVariables;
};



/*
query QueueSettingsQuery {
  viewer {
    id
    moderatorSettings {
      isInModeratorQueue
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ModeratorSettings",
        "kind": "LinkedField",
        "name": "moderatorSettings",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isInModeratorQueue",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "QueueSettingsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "QueueSettingsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "dcb46663ed45d0d4edb35941026f4a66",
    "metadata": {},
    "name": "QueueSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '39706208c79f01166cccd0abdabd866e';
export default node;
