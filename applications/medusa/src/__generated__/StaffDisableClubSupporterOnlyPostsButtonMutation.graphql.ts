/**
 * @generated SignedSource<<beccd357a0491d96c7b433c797ec0e36>>
 * @relayHash a1321a29a8d890fee47b213f5051d712
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a1321a29a8d890fee47b213f5051d712

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DisableClubSupporterOnlyPostsInput = {
  clubId: string;
};
export type StaffDisableClubSupporterOnlyPostsButtonMutation$variables = {
  input: DisableClubSupporterOnlyPostsInput;
};
export type StaffDisableClubSupporterOnlyPostsButtonMutation$data = {
  readonly disableClubSupporterOnlyPosts: {
    readonly club: {
      readonly canCreateSupporterOnlyPosts: boolean;
      readonly id: string;
    } | null;
  } | null;
};
export type StaffDisableClubSupporterOnlyPostsButtonMutation = {
  response: StaffDisableClubSupporterOnlyPostsButtonMutation$data;
  variables: StaffDisableClubSupporterOnlyPostsButtonMutation$variables;
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
    "concreteType": "DisableClubSupporterOnlyPostsPayload",
    "kind": "LinkedField",
    "name": "disableClubSupporterOnlyPosts",
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
    "name": "StaffDisableClubSupporterOnlyPostsButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffDisableClubSupporterOnlyPostsButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "a1321a29a8d890fee47b213f5051d712",
    "metadata": {},
    "name": "StaffDisableClubSupporterOnlyPostsButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "93f7d96b15385c53120970737ce67da5";

export default node;
