/**
 * @generated SignedSource<<2f004d5877e2245becfb1fdcd3c1c7e3>>
 * @relayHash 111b8a162148e09fc8d2ec9c1ba6fc94
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 111b8a162148e09fc8d2ec9c1ba6fc94

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EnableClubSupporterOnlyPostsInput = {
  clubId: string;
};
export type StaffEnableClubSupporterOnlyPostsButtonMutation$variables = {
  input: EnableClubSupporterOnlyPostsInput;
};
export type StaffEnableClubSupporterOnlyPostsButtonMutation$data = {
  readonly enableClubSupporterOnlyPosts: {
    readonly club: {
      readonly canCreateSupporterOnlyPosts: boolean;
      readonly id: string;
    } | null;
  } | null;
};
export type StaffEnableClubSupporterOnlyPostsButtonMutation = {
  response: StaffEnableClubSupporterOnlyPostsButtonMutation$data;
  variables: StaffEnableClubSupporterOnlyPostsButtonMutation$variables;
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
    "concreteType": "EnableClubSupporterOnlyPostsPayload",
    "kind": "LinkedField",
    "name": "enableClubSupporterOnlyPosts",
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
            "kind": "ScalarField",
            "name": "canCreateSupporterOnlyPosts",
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
    "name": "StaffEnableClubSupporterOnlyPostsButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffEnableClubSupporterOnlyPostsButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "111b8a162148e09fc8d2ec9c1ba6fc94",
    "metadata": {},
    "name": "StaffEnableClubSupporterOnlyPostsButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "4843e6ad48f01d9fd6bbf69ce32794aa";

export default node;
