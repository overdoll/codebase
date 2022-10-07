/**
 * @generated SignedSource<<402562a48581a9c02201afbab2042b4a>>
 * @relayHash 58fa0c12bd092a4f7581a7856c1e1221
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 58fa0c12bd092a4f7581a7856c1e1221

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
        readonly viewerMember: {
          readonly __typename: "ClubMember";
        } | null;
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
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Account",
  "kind": "LinkedField",
  "name": "account",
  "plural": false,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "joinedAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ClubJoinWrapperMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Club",
                "kind": "LinkedField",
                "name": "club",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ClubMember",
                    "kind": "LinkedField",
                    "name": "viewerMember",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/),
              (v5/*: any*/)
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
    "name": "ClubJoinWrapperMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Club",
                "kind": "LinkedField",
                "name": "club",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ClubMember",
                    "kind": "LinkedField",
                    "name": "viewerMember",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "58fa0c12bd092a4f7581a7856c1e1221",
    "metadata": {},
    "name": "ClubJoinWrapperMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "ddf30e2f8d630814f058df5b22f2706b";

export default node;
