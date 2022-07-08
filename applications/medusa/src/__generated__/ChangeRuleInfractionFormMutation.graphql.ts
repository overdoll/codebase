/**
 * @generated SignedSource<<601157d28edf0d0096555bcc899e7e3e>>
 * @relayHash 9d76c867eeaf618e63a5869261656a0f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 9d76c867eeaf618e63a5869261656a0f

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateRuleInfractionInput = {
  infraction: boolean;
  ruleId: string;
};
export type ChangeRuleInfractionFormMutation$variables = {
  input: UpdateRuleInfractionInput;
};
export type ChangeRuleInfractionFormMutation$data = {
  readonly updateRuleInfraction: {
    readonly rule: {
      readonly id: string;
      readonly infraction: boolean;
    } | null;
  } | null;
};
export type ChangeRuleInfractionFormMutation = {
  response: ChangeRuleInfractionFormMutation$data;
  variables: ChangeRuleInfractionFormMutation$variables;
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
    "concreteType": "UpdateRuleInfractionPayload",
    "kind": "LinkedField",
    "name": "updateRuleInfraction",
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
            "name": "infraction",
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
    "name": "ChangeRuleInfractionFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeRuleInfractionFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "9d76c867eeaf618e63a5869261656a0f",
    "metadata": {},
    "name": "ChangeRuleInfractionFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "0ab283782532b0e5e04f35cdd6f1c4b8";

export default node;
