/**
 * @generated SignedSource<<d7ae77b892424740fcd4d9b7ec4ce612>>
 * @relayHash d5e2c1d6a74ab209ad64f98ca256fbf9
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d5e2c1d6a74ab209ad64f98ca256fbf9

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateRuleDeprecatedInput = {
  deprecated: boolean;
  ruleId: string;
};
export type ChangeRuleDeprecatedFormMutation$variables = {
  input: UpdateRuleDeprecatedInput;
};
export type ChangeRuleDeprecatedFormMutation$data = {
  readonly updateRuleDeprecated: {
    readonly rule: {
      readonly deprecated: boolean;
      readonly id: string;
    } | null;
  } | null;
};
export type ChangeRuleDeprecatedFormMutation = {
  response: ChangeRuleDeprecatedFormMutation$data;
  variables: ChangeRuleDeprecatedFormMutation$variables;
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
    "name": "ChangeRuleDeprecatedFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeRuleDeprecatedFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "d5e2c1d6a74ab209ad64f98ca256fbf9",
    "metadata": {},
    "name": "ChangeRuleDeprecatedFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "f52c8e43bc994a69971d6119dc9bba73";

export default node;
