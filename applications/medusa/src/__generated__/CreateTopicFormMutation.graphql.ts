/**
 * @generated SignedSource<<05a57edde758939aab253a4509f11755>>
 * @relayHash 56c292214526b05384a13795affeaff1
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 56c292214526b05384a13795affeaff1

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateTopicValidation = "SLUG_TAKEN" | "%future added value";
export type CreateTopicInput = {
  description: string;
  slug: string;
  title: string;
  weight: number;
};
export type CreateTopicFormMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateTopicInput;
};
export type CreateTopicFormMutation$data = {
  readonly createTopic: {
    readonly topic: {
      readonly description: string;
      readonly id: string;
      readonly title: string;
      readonly weight: number;
    } | null;
    readonly validation: CreateTopicValidation | null;
  } | null;
};
export type CreateTopicFormMutation = {
  response: CreateTopicFormMutation$data;
  variables: CreateTopicFormMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
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
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "validation",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateTopicFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateTopicPayload",
        "kind": "LinkedField",
        "name": "createTopic",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateTopicFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateTopicPayload",
        "kind": "LinkedField",
        "name": "createTopic",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "topic",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "createTopicEdge"
              }
            ]
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "56c292214526b05384a13795affeaff1",
    "metadata": {},
    "name": "CreateTopicFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "8f00ea98eb989610e2b2b6da560fd091";

export default node;
