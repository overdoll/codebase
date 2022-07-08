/**
 * @generated SignedSource<<fe61bb162fc043f5029507c12744d8d7>>
 * @relayHash b8b2349b6ccbf555ede496c181a7fa94
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b8b2349b6ccbf555ede496c181a7fa94

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AssignAccountArtistRole = {
  accountId: string;
};
export type StaffAssignArtistButtonMutation$variables = {
  input: AssignAccountArtistRole;
};
export type StaffAssignArtistButtonMutation$data = {
  readonly assignAccountArtistRole: {
    readonly account: {
      readonly id: string;
      readonly isArtist: boolean;
    } | null;
  } | null;
};
export type StaffAssignArtistButtonMutation = {
  response: StaffAssignArtistButtonMutation$data;
  variables: StaffAssignArtistButtonMutation$variables;
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
    "concreteType": "AssignAccountArtistRolePayload",
    "kind": "LinkedField",
    "name": "assignAccountArtistRole",
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
            "kind": "ScalarField",
            "name": "isArtist",
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
    "name": "StaffAssignArtistButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffAssignArtistButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "b8b2349b6ccbf555ede496c181a7fa94",
    "metadata": {},
    "name": "StaffAssignArtistButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "4b6f291fd5a6fd6d43469c748692df32";

export default node;
