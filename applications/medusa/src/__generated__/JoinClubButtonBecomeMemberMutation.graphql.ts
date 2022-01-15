/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash e1ea829a799e377aa54cc8f769264456 */

import { ConcreteRequest } from "relay-runtime";
export type JoinClubButtonBecomeMemberMutationVariables = {
    clubId: string;
};
export type JoinClubButtonBecomeMemberMutationResponse = {
    readonly becomeClubMember: {
        readonly clubMember: {
            readonly id: string;
            readonly club: {
                readonly id: string;
                readonly viewerMember: {
                    readonly id: string;
                } | null;
            };
            readonly account: {
                readonly id: string;
            };
        } | null;
    } | null;
};
export type JoinClubButtonBecomeMemberMutation = {
    readonly response: JoinClubButtonBecomeMemberMutationResponse;
    readonly variables: JoinClubButtonBecomeMemberMutationVariables;
};



/*
mutation JoinClubButtonBecomeMemberMutation(
  $clubId: ID!
) {
  becomeClubMember(input: {clubId: $clubId}) {
    clubMember {
      id
      club {
        id
        viewerMember {
          id
        }
      }
      account {
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "clubId"
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
        "fields": [
          {
            "kind": "Variable",
            "name": "clubId",
            "variableName": "clubId"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "BecomeClubMemberPayload",
    "kind": "LinkedField",
    "name": "becomeClubMember",
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
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ClubMember",
                "kind": "LinkedField",
                "name": "viewerMember",
                "plural": false,
                "selections": (v2/*: any*/),
                "storageKey": null
              }
            ],
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
    "name": "JoinClubButtonBecomeMemberMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "JoinClubButtonBecomeMemberMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": "e1ea829a799e377aa54cc8f769264456",
    "metadata": {},
    "name": "JoinClubButtonBecomeMemberMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '03c0e73247a4e31f4ac05278aead190a';
export default node;