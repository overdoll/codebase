/**
 * @generated SignedSource<<a5ead3cee0dda6448d0992519484fc2a>>
 * @relayHash f82b308d7f8150a795ee4ce93d121106
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f82b308d7f8150a795ee4ce93d121106

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SetPaxumAccountPayoutMethodInput = {
  email: string;
};
export type SetPaxumAccountPayoutMethodFormMutation$variables = {
  input: SetPaxumAccountPayoutMethodInput;
};
export type SetPaxumAccountPayoutMethodFormMutationVariables = SetPaxumAccountPayoutMethodFormMutation$variables;
export type SetPaxumAccountPayoutMethodFormMutation$data = {
  readonly setPaxumAccountPayoutMethod: {
    readonly accountPayoutMethod: {
      readonly __typename: string;
      readonly id?: string;
      readonly email?: string;
      readonly " $fragmentSpreads": FragmentRefs<"PayoutMethodFragment" | "PayoutMethodDeleteFragment">;
    } | null;
  } | null;
};
export type SetPaxumAccountPayoutMethodFormMutationResponse = SetPaxumAccountPayoutMethodFormMutation$data;
export type SetPaxumAccountPayoutMethodFormMutation = {
  variables: SetPaxumAccountPayoutMethodFormMutationVariables;
  response: SetPaxumAccountPayoutMethodFormMutation$data;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SetPaxumAccountPayoutMethodFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PayoutMethodFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PayoutMethodDeleteFragment"
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SetPaxumAccountPayoutMethodFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isAccountPayoutMethod"
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "f82b308d7f8150a795ee4ce93d121106",
    "metadata": {},
    "name": "SetPaxumAccountPayoutMethodFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "fe8152064681c20d916b17949ce9a95d";

export default node;
