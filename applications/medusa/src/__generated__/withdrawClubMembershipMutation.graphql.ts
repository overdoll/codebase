/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 006cfab27593627035c407d42fbe8d72 */

import { ConcreteRequest } from "relay-runtime";
export type withdrawClubMembershipMutationVariables = {
    clubId: string;
};
export type withdrawClubMembershipMutationResponse = {
    readonly withdrawClubMembership: {
        readonly clubMemberId: string;
    } | null;
};
export type withdrawClubMembershipMutation = {
    readonly response: withdrawClubMembershipMutationResponse;
    readonly variables: withdrawClubMembershipMutationVariables;
};



/*
mutation withdrawClubMembershipMutation(
  $clubId: ID!
) {
  withdrawClubMembership(input: {clubId: $clubId}) {
    clubMemberId
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
v1 = [
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
    "concreteType": "WithdrawClubMembershipPayload",
    "kind": "LinkedField",
    "name": "withdrawClubMembership",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clubMemberId",
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
    "name": "withdrawClubMembershipMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "withdrawClubMembershipMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "006cfab27593627035c407d42fbe8d72",
    "metadata": {},
    "name": "withdrawClubMembershipMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '00fd6928689e1691959cd1481c0b025d';
export default node;
