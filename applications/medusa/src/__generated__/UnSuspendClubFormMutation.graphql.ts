/**
 * @generated SignedSource<<9f2733c8dcf5b00d9e14d7c88facf198>>
 * @relayHash 4740f0f84396b27bf53ec1216ccdc2a7
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4740f0f84396b27bf53ec1216ccdc2a7

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UnSuspendClubInput = {
  clubId: string;
};
export type UnSuspendClubFormMutation$variables = {
  input: UnSuspendClubInput;
};
export type UnSuspendClubFormMutationVariables = UnSuspendClubFormMutation$variables;
export type UnSuspendClubFormMutation$data = {
  readonly unSuspendClub: {
    readonly club: {
      readonly id: string;
      readonly suspension: {
        readonly __typename: string;
        readonly expires: any;
      } | null;
    } | null;
  } | null;
};
export type UnSuspendClubFormMutationResponse = UnSuspendClubFormMutation$data;
export type UnSuspendClubFormMutation = {
  variables: UnSuspendClubFormMutationVariables;
  response: UnSuspendClubFormMutation$data;
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
                "name": "__typename",
                "storageKey": null
              },
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
    "name": "UnSuspendClubFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UnSuspendClubFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "4740f0f84396b27bf53ec1216ccdc2a7",
    "metadata": {},
    "name": "UnSuspendClubFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "4be67d5ac2c5e4cb665714015b111719";

export default node;
