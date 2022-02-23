/**
 * @generated SignedSource<<fbabb675e282b212527911e698749ab2>>
 * @relayHash 0c1ff71f83986d1262cd222aef163a3e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0c1ff71f83986d1262cd222aef163a3e

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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
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
    "name": "SuspendClubFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SuspendClubFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "0c1ff71f83986d1262cd222aef163a3e",
    "metadata": {},
    "name": "SuspendClubFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "5eb5aba8df6ec8e5b39f1d8d6085d8e6";

export default node;
