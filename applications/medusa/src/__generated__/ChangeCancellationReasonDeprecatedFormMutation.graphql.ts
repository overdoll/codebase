/**
 * @generated SignedSource<<f09a9d7596c895cfdfb0a498772c6786>>
 * @relayHash eea49859b6027079cb6fa3e2de9e627b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID eea49859b6027079cb6fa3e2de9e627b

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateRuleDeprecatedInput = {
  deprecated: boolean;
  ruleId: string;
};
export type ChangeCancellationReasonDeprecatedFormMutation$variables = {
  input: UpdateRuleDeprecatedInput;
};
export type ChangeCancellationReasonDeprecatedFormMutationVariables = ChangeCancellationReasonDeprecatedFormMutation$variables;
export type ChangeCancellationReasonDeprecatedFormMutation$data = {
  readonly updateRuleDeprecated: {
    readonly rule: {
      readonly id: string;
      readonly deprecated: boolean;
    } | null;
  } | null;
};
export type ChangeCancellationReasonDeprecatedFormMutationResponse = ChangeCancellationReasonDeprecatedFormMutation$data;
export type ChangeCancellationReasonDeprecatedFormMutation = {
  variables: ChangeCancellationReasonDeprecatedFormMutationVariables;
  response: ChangeCancellationReasonDeprecatedFormMutation$data;
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
    "concreteType": "UpdateRuleDeprecatedPayload",
    "kind": "LinkedField",
    "name": "updateRuleDeprecated",
    "plural": false,
    "selections": [
      {
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
            "name": "deprecated",
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
    "name": "ChangeCancellationReasonDeprecatedFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeCancellationReasonDeprecatedFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "eea49859b6027079cb6fa3e2de9e627b",
    "metadata": {},
    "name": "ChangeCancellationReasonDeprecatedFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "40f7416b1c36986d9c3ed0da84f148f7";

export default node;
