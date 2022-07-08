/**
 * @generated SignedSource<<2feacdff7377c516028488503b0bcaf1>>
 * @relayHash 904ca34a485e0ac2c304cf48a19b8446
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 904ca34a485e0ac2c304cf48a19b8446

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ClubPayoutStatus = "CANCELLED" | "DEPOSITED" | "FAILED" | "PROCESSING" | "QUEUED" | "%future added value";
export type InitiateClubPayoutInput = {
  clubId: string;
  depositDate?: any | null;
};
export type InitiateClubPayoutFormMutation$variables = {
  input: InitiateClubPayoutInput;
};
export type InitiateClubPayoutFormMutation$data = {
  readonly initiateClubPayout: {
    readonly club: {
      readonly id: string;
      readonly payouts: {
        readonly edges: ReadonlyArray<{
          readonly node: {
            readonly depositDate: any;
            readonly id: string;
            readonly status: ClubPayoutStatus;
          };
        }>;
      };
    };
  } | null;
};
export type InitiateClubPayoutFormMutation = {
  response: InitiateClubPayoutFormMutation$data;
  variables: InitiateClubPayoutFormMutation$variables;
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
    "concreteType": "InitiateClubPayoutPayload",
    "kind": "LinkedField",
    "name": "initiateClubPayout",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubPayoutConnection",
            "kind": "LinkedField",
            "name": "payouts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ClubPayoutEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ClubPayout",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "status",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "depositDate",
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
    "name": "InitiateClubPayoutFormMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InitiateClubPayoutFormMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "904ca34a485e0ac2c304cf48a19b8446",
    "metadata": {},
    "name": "InitiateClubPayoutFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "19706efa881ebdf0ba185cdfe352ed7a";

export default node;
