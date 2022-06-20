/**
 * @generated SignedSource<<dba3d1eb1aa4cf0379c1f8da1145269c>>
 * @relayHash e8c7fff818a05aa6c08283a68549d6c2
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID e8c7fff818a05aa6c08283a68549d6c2

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
        readonly alpha3: string;
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
                "name": "alpha3",
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
    "id": "e8c7fff818a05aa6c08283a68549d6c2",
    "metadata": {},
    "name": "UpdateAccountDetailsMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "0e0957e983a2d787cef2eca5205da086";

export default node;
