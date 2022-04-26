/**
 * @generated SignedSource<<180214dbdaf9076369cfbd1d211f79a8>>
 * @relayHash 24ee4896c7fbb296418392410743043a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 24ee4896c7fbb296418392410743043a

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetPaxumAccountPayoutMethodInput = {
  email: string;
};
export type SetupPaxumAccountPayoutMethodMutation$variables = {
  input: SetPaxumAccountPayoutMethodInput;
};
export type SetupPaxumAccountPayoutMethodMutationVariables = SetupPaxumAccountPayoutMethodMutation$variables;
export type SetupPaxumAccountPayoutMethodMutation$data = {
  readonly setPaxumAccountPayoutMethod: {
    readonly accountPayoutMethod: {
      readonly __typename: "AccountPaxumPayoutMethod";
      readonly id: string;
      readonly email: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null;
  } | null;
};
export type SetupPaxumAccountPayoutMethodMutationResponse = SetupPaxumAccountPayoutMethodMutation$data;
export type SetupPaxumAccountPayoutMethodMutation = {
  variables: SetupPaxumAccountPayoutMethodMutationVariables;
  response: SetupPaxumAccountPayoutMethodMutation$data;
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
    "concreteType": "SetPaxumAccountPayoutMethodPayload",
    "kind": "LinkedField",
    "name": "setPaxumAccountPayoutMethod",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "accountPayoutMethod",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
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
                "name": "email",
                "storageKey": null
              }
            ],
            "type": "AccountPaxumPayoutMethod",
            "abstractKey": null
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
    "name": "SetupPaxumAccountPayoutMethodMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SetupPaxumAccountPayoutMethodMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "24ee4896c7fbb296418392410743043a",
    "metadata": {},
    "name": "SetupPaxumAccountPayoutMethodMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "4cbc4fdc2a939faa438e5afc59b1e07f";

export default node;
