/**
 * @generated SignedSource<<bf2f1bfaa56c7737c32138faf2ef44c0>>
 * @relayHash ec8d95ec074ce37d1b95d801248051c9
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ec8d95ec074ce37d1b95d801248051c9

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateTopicWeightInput = {
  id: string;
  weight: number;
};
export type ChangeTopicWeightFormMutation$variables = {
  input: UpdateTopicWeightInput;
};
export type ChangeTopicWeightFormMutation$data = {
  readonly updateTopicWeight: {
    readonly topic: {
      readonly id: string;
      readonly weight: number;
    } | null;
  } | null;
};
export type ChangeTopicWeightFormMutation = {
  response: ChangeTopicWeightFormMutation$data;
  variables: ChangeTopicWeightFormMutation$variables;
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
    "concreteType": "UpdateTopicWeightPayload",
    "kind": "LinkedField",
    "name": "updateTopicWeight",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Topic",
        "kind": "LinkedField",
        "name": "topic",
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
            "kind": "ScalarField",
            "name": "weight",
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
    "name": "ChangeTopicWeightFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeTopicWeightFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "ec8d95ec074ce37d1b95d801248051c9",
    "metadata": {},
    "name": "ChangeTopicWeightFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "32d693f202f700c687d070f523b67e6f";

export default node;
