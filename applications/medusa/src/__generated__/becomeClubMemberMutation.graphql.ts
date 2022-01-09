/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 99e17e77a717ede45ad9b966c2eae9b3 */

import { ConcreteRequest } from "relay-runtime";
export type becomeClubMemberMutationVariables = {
    clubId: string;
};
export type becomeClubMemberMutationResponse = {
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
export type becomeClubMemberMutation = {
    readonly response: becomeClubMemberMutationResponse;
    readonly variables: becomeClubMemberMutationVariables;
};



/*
mutation becomeClubMemberMutation(
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
    "name": "becomeClubMemberMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "becomeClubMemberMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": "99e17e77a717ede45ad9b966c2eae9b3",
    "metadata": {},
    "name": "becomeClubMemberMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '44f8b827fa00616c8a21d384eb026a03';
export default node;
