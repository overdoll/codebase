/**
 * @generated SignedSource<<21a3543fde9286d8c7156dedbc533010>>
 * @relayHash e393fc31df6535db2a0d9c2e10764c98
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID e393fc31df6535db2a0d9c2e10764c98

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PayoutMethod = "PAXUM" | "%future added value";
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
        readonly payoutMethods: ReadonlyArray<PayoutMethod>;
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "payoutMethods",
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
    "id": "e393fc31df6535db2a0d9c2e10764c98",
    "metadata": {},
    "name": "UpdateAccountDetailsMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "64e63bb13c0db49e2841ce66b4871047";

export default node;
