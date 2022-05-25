/**
 * @generated SignedSource<<0c93823c5376ad881feaf21a1ec9f39d>>
 * @relayHash 5d25ec0ecad13f8323320fba45a9659a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 5d25ec0ecad13f8323320fba45a9659a

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SuspendClubInput = {
  clubId: string;
  endTime: any;
};
export type SuspendClubFormMutation$variables = {
  input: SuspendClubInput;
};
export type SuspendClubFormMutationVariables = SuspendClubFormMutation$variables;
export type SuspendClubFormMutation$data = {
  readonly suspendClub: {
    readonly club: {
      readonly id: string;
      readonly suspension: {
        readonly expires: any;
      } | null;
      readonly termination: {
        readonly account: {
          readonly username: string;
        };
      } | null;
    } | null;
  } | null;
};
export type SuspendClubFormMutationResponse = SuspendClubFormMutation$data;
export type SuspendClubFormMutation = {
  variables: SuspendClubFormMutationVariables;
  response: SuspendClubFormMutation$data;
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "ClubSuspension",
  "kind": "LinkedField",
  "name": "suspension",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "expires",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SuspendClubFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SuspendClubPayload",
        "kind": "LinkedField",
        "name": "suspendClub",
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
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ClubTermination",
                "kind": "LinkedField",
                "name": "termination",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Account",
                    "kind": "LinkedField",
                    "name": "account",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/)
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SuspendClubFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SuspendClubPayload",
        "kind": "LinkedField",
        "name": "suspendClub",
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
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ClubTermination",
                "kind": "LinkedField",
                "name": "termination",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Account",
                    "kind": "LinkedField",
                    "name": "account",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v2/*: any*/)
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
    ]
  },
  "params": {
    "id": "5d25ec0ecad13f8323320fba45a9659a",
    "metadata": {},
    "name": "SuspendClubFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "2a615a7eafc9aab90d812a820c704bd8";

export default node;
