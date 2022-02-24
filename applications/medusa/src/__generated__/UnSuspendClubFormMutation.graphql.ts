/**
 * @generated SignedSource<<57fd5ca806a35ddd5b5a67af9f4a9fa0>>
 * @relayHash d37d3e5b99fb63dc469301b05c69d821
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d37d3e5b99fb63dc469301b05c69d821

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
    "id": "d37d3e5b99fb63dc469301b05c69d821",
    "metadata": {},
    "name": "UnSuspendClubFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "348b8b79d0dfa8805fb30915e99f37b6";

export default node;
