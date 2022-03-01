/**
 * @generated SignedSource<<0042aec38513bcee1c8cc68ba1edebb5>>
 * @relayHash 43a783722a257b96b021232b77936c7d
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 43a783722a257b96b021232b77936c7d

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateRuleInput = {
  description: string;
  infraction: boolean;
  title: string;
};
export type CreateRuleFormMutation$variables = {
  input: CreateRuleInput;
  connections: ReadonlyArray<string>;
};
export type CreateRuleFormMutationVariables = CreateRuleFormMutation$variables;
export type CreateRuleFormMutation$data = {
  readonly createRule: {
    readonly rule: {
      readonly id: string;
      readonly title: string;
      readonly description: string;
    } | null;
  } | null;
};
export type CreateRuleFormMutationResponse = CreateRuleFormMutation$data;
export type CreateRuleFormMutation = {
  variables: CreateRuleFormMutationVariables;
  response: CreateRuleFormMutation$data;
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
  "concreteType": "Rule",
  "kind": "LinkedField",
  "name": "rule",
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
    }
  ],
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
    "name": "CreateRuleFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateRulePayload",
        "kind": "LinkedField",
        "name": "createRule",
        "plural": false,
        "selections": [
          (v3/*: any*/)
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
    "name": "CreateRuleFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateRulePayload",
        "kind": "LinkedField",
        "name": "createRule",
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
            "name": "rule",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "createAudienceEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "43a783722a257b96b021232b77936c7d",
    "metadata": {},
    "name": "CreateRuleFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "ce41630ac4f2940ef026014da5e5d346";

export default node;
