/**
 * @generated SignedSource<<6262b920bbb29334e8b1119a066ab84d>>
 * @relayHash 84c6736e68833bf44d6a7079a1f38a64
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 84c6736e68833bf44d6a7079a1f38a64

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type JoinClubInput = {
  clubId: string;
};
export type ClubJoinWrapperMutation$variables = {
  input: JoinClubInput;
};
export type ClubJoinWrapperMutation$data = {
  readonly joinClub: {
    readonly clubMember: {
      readonly account: {
        readonly id: string;
      };
      readonly club: {
        readonly id: string;
      };
      readonly id: string;
      readonly joinedAt: any;
    } | null;
  } | null;
};
export type ClubJoinWrapperMutation = {
  response: ClubJoinWrapperMutation$data;
  variables: ClubJoinWrapperMutation$variables;
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
  (v1/*: any*/)
],
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "JoinClubPayload",
    "kind": "LinkedField",
    "name": "joinClub",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ClubMember",
        "kind": "LinkedField",
        "name": "clubMember",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Club",
            "kind": "LinkedField",
            "name": "club",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "joinedAt",
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
    "name": "ClubJoinWrapperMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ClubJoinWrapperMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": "84c6736e68833bf44d6a7079a1f38a64",
    "metadata": {},
    "name": "ClubJoinWrapperMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "fa00524529d4708810bcc7fee170c504";

export default node;
