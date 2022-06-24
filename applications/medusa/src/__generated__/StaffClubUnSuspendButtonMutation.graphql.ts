/**
 * @generated SignedSource<<5c3aa0699ffc1f9e2a60c6baa68c78e9>>
 * @relayHash 17ded83d95b97e0af0fcf21db9816850
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 17ded83d95b97e0af0fcf21db9816850

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UnSuspendClubInput = {
  clubId: string;
};
export type StaffClubUnSuspendButtonMutation$variables = {
  input: UnSuspendClubInput;
};
export type StaffClubUnSuspendButtonMutation$data = {
  readonly unSuspendClub: {
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
export type StaffClubUnSuspendButtonMutation = {
  response: StaffClubUnSuspendButtonMutation$data;
  variables: StaffClubUnSuspendButtonMutation$variables;
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
    "name": "StaffClubUnSuspendButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UnSuspendClubPayload",
        "kind": "LinkedField",
        "name": "unSuspendClub",
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
    "name": "StaffClubUnSuspendButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UnSuspendClubPayload",
        "kind": "LinkedField",
        "name": "unSuspendClub",
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
    "id": "17ded83d95b97e0af0fcf21db9816850",
    "metadata": {},
    "name": "StaffClubUnSuspendButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "c7073e2690b6c66518cbd08132f5340d";

export default node;
