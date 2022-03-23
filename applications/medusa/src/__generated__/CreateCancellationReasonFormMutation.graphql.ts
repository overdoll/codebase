/**
 * @generated SignedSource<<a701dd5010854db926459ec42878fac0>>
 * @relayHash 06f231f9450ad429f31c8079eff2f4e6
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 06f231f9450ad429f31c8079eff2f4e6

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateCancellationReasonInput = {
  title: string;
};
export type CreateCancellationReasonFormMutation$variables = {
  input: CreateCancellationReasonInput;
  connections: ReadonlyArray<string>;
};
export type CreateCancellationReasonFormMutationVariables = CreateCancellationReasonFormMutation$variables;
export type CreateCancellationReasonFormMutation$data = {
  readonly createCancellationReason: {
    readonly cancellationReason: {
      readonly id: string;
      readonly title: string;
    } | null;
  } | null;
};
export type CreateCancellationReasonFormMutationResponse = CreateCancellationReasonFormMutation$data;
export type CreateCancellationReasonFormMutation = {
  variables: CreateCancellationReasonFormMutationVariables;
  response: CreateCancellationReasonFormMutation$data;
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
  "concreteType": "CancellationReason",
  "kind": "LinkedField",
  "name": "cancellationReason",
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
    "name": "CreateCancellationReasonFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateCancellationReasonPayload",
        "kind": "LinkedField",
        "name": "createCancellationReason",
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
    "name": "CreateCancellationReasonFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateCancellationReasonPayload",
        "kind": "LinkedField",
        "name": "createCancellationReason",
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
            "name": "cancellationReason",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "createCancellationReasonEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "06f231f9450ad429f31c8079eff2f4e6",
    "metadata": {},
    "name": "CreateCancellationReasonFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "5f84c789d0e3bc096c0738b0634f0292";

export default node;
