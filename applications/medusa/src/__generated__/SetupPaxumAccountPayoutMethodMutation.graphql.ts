/**
 * @generated SignedSource<<55268e90e1ed6e8a54f3b09adb7af70b>>
 * @relayHash ee4a14cc0004f9fdf8a996dc36828075
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ee4a14cc0004f9fdf8a996dc36828075

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
      readonly __typename: string;
      readonly id?: string;
      readonly email?: string;
      readonly " $fragmentSpreads": FragmentRefs<"PayoutMethodFragment" | "PayoutMethodDeleteFragment">;
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
    "name": "SetupPaxumAccountPayoutMethodMutation",
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
    "name": "SetupPaxumAccountPayoutMethodMutation",
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
    "id": "ee4a14cc0004f9fdf8a996dc36828075",
    "metadata": {},
    "name": "SetupPaxumAccountPayoutMethodMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "e36e5a072d92109e984bd1c00d7ce6b6";

export default node;
