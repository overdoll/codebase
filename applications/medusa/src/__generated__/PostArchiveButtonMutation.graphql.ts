/**
 * @generated SignedSource<<9a69ca35c6ab54852b8c555c28444aa9>>
 * @relayHash fba510db779c812692a0c7145555b5c9
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID fba510db779c812692a0c7145555b5c9

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "%future added value";
export type ArchivePostInput = {
  id: string;
};
export type PostArchiveButtonMutation$variables = {
  input: ArchivePostInput;
};
export type PostArchiveButtonMutation$data = {
  readonly archivePost: {
    readonly post: {
      readonly id: string;
      readonly state: PostState;
    } | null;
  } | null;
};
export type PostArchiveButtonMutation = {
  response: PostArchiveButtonMutation$data;
  variables: PostArchiveButtonMutation$variables;
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
    "concreteType": "ArchivePostPayload",
    "kind": "LinkedField",
    "name": "archivePost",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
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
            "name": "state",
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
    "name": "PostArchiveButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostArchiveButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "fba510db779c812692a0c7145555b5c9",
    "metadata": {},
    "name": "PostArchiveButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "8cc475e4d462dcd9049ab424d789c38e";

export default node;
