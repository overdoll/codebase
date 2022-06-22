/**
 * @generated SignedSource<<e914ff87d3787ca1fb8ee8996e56438d>>
 * @relayHash cad9915e72828e86c2b91ac529dead54
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID cad9915e72828e86c2b91ac529dead54

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CancelActiveSupporterSubscriptionsForClubInput = {
  clubId: string;
};
export type StaffClubCancelActiveSupporterSubscriptionsForClubMutation$variables = {
  input: CancelActiveSupporterSubscriptionsForClubInput;
};
export type StaffClubCancelActiveSupporterSubscriptionsForClubMutation$data = {
  readonly cancelActiveSupporterSubscriptionsForClub: {
    readonly club: {
      readonly id: string;
    } | null;
  } | null;
};
export type StaffClubCancelActiveSupporterSubscriptionsForClubMutation = {
  response: StaffClubCancelActiveSupporterSubscriptionsForClubMutation$data;
  variables: StaffClubCancelActiveSupporterSubscriptionsForClubMutation$variables;
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
    "concreteType": "CancelActiveSupporterSubscriptionsForClubPayload",
    "kind": "LinkedField",
    "name": "cancelActiveSupporterSubscriptionsForClub",
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
    "name": "StaffClubCancelActiveSupporterSubscriptionsForClubMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffClubCancelActiveSupporterSubscriptionsForClubMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "cad9915e72828e86c2b91ac529dead54",
    "metadata": {},
    "name": "StaffClubCancelActiveSupporterSubscriptionsForClubMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "485b37e3ad32283748245ecaa01843f2";

export default node;
