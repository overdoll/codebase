/**
 * @generated SignedSource<<286d65c61b9900983b9ce63feab03370>>
 * @relayHash 2cf6efdfb1d7452132948d2adf541905
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 2cf6efdfb1d7452132948d2adf541905

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateAccountDetailsInput = {
  countryId: string;
  firstName: string;
  lastName: string;
};
export type UpdateAccountDetailsMutation$variables = {
  input: UpdateAccountDetailsInput;
};
export type UpdateAccountDetailsMutationVariables = UpdateAccountDetailsMutation$variables;
export type UpdateAccountDetailsMutation$data = {
  readonly updateAccountDetails: {
    readonly accountDetails: {
      readonly id: string;
      readonly firstName: string;
      readonly lastName: string;
      readonly country: {
        readonly id: string;
        readonly name: string;
        readonly emoji: string;
      };
    } | null;
  } | null;
};
export type UpdateAccountDetailsMutationResponse = UpdateAccountDetailsMutation$data;
export type UpdateAccountDetailsMutation = {
  variables: UpdateAccountDetailsMutationVariables;
  response: UpdateAccountDetailsMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateAccountDetailsPayload",
    "kind": "LinkedField",
    "name": "updateAccountDetails",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountDetails",
        "kind": "LinkedField",
        "name": "accountDetails",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "firstName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Country",
            "kind": "LinkedField",
            "name": "country",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "emoji",
                "storageKey": null
              }
            ],
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
    "name": "UpdateAccountDetailsMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateAccountDetailsMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "2cf6efdfb1d7452132948d2adf541905",
    "metadata": {},
    "name": "UpdateAccountDetailsMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "b0c8cad5a0a32240d52c28bf26929646";

export default node;
