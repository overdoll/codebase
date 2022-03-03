/**
 * @generated SignedSource<<727318dbd8be02b8862789eff3cb648f>>
 * @relayHash e7cb73e99697764bb651d0792fa56da7
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID e7cb73e99697764bb651d0792fa56da7

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type BecomeMemberButtonMutation$variables = {
  clubId: string;
};
export type BecomeMemberButtonMutationVariables = BecomeMemberButtonMutation$variables;
export type BecomeMemberButtonMutation$data = {
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
export type BecomeMemberButtonMutationResponse = BecomeMemberButtonMutation$data;
export type BecomeMemberButtonMutation = {
  variables: BecomeMemberButtonMutationVariables;
  response: BecomeMemberButtonMutation$data;
};

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
    "name": "BecomeMemberButtonMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BecomeMemberButtonMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": "e7cb73e99697764bb651d0792fa56da7",
    "metadata": {},
    "name": "BecomeMemberButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "502e25d2b62fd3d0d5669d429b4d18d9";

export default node;
