/**
 * @generated SignedSource<<2120fa8048ed382b467454c19066c8b3>>
 * @relayHash cd4a8c78de6041cba5003e98bef1b054
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID cd4a8c78de6041cba5003e98bef1b054

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddModeratorToPostQueueInput = {
  accountId: string;
};
export type QueueSettingsAddMutation$variables = {
  input: AddModeratorToPostQueueInput;
};
export type QueueSettingsAddMutation$data = {
  readonly addModeratorToPostQueue: {
    readonly account: {
      readonly id: string;
      readonly moderatorSettings: {
        readonly isInModeratorQueue: boolean;
      };
    } | null;
  } | null;
};
export type QueueSettingsAddMutation = {
  response: QueueSettingsAddMutation$data;
  variables: QueueSettingsAddMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "AddModeratorToPostQueuePayload",
    "kind": "LinkedField",
    "name": "addModeratorToPostQueue",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "QueueSettingsAddMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QueueSettingsAddMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "cd4a8c78de6041cba5003e98bef1b054",
    "metadata": {},
    "name": "QueueSettingsAddMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "a0c9565811a173e4ebb37ff9f73643b3";

export default node;
