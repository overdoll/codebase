/**
 * @generated SignedSource<<cf2cbc45e3cf910e008f62a6c1348459>>
 * @relayHash 580cb088851f0d83a7752cf1753c7f72
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 580cb088851f0d83a7752cf1753c7f72

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdatePostContentOrderInput = {
  contentIds: ReadonlyArray<string>;
  id: string;
};
export type ArrangeDownPostContentButtonMutation$variables = {
  input: UpdatePostContentOrderInput;
};
export type ArrangeDownPostContentButtonMutation$data = {
  readonly updatePostContentOrder: {
    readonly post: {
      readonly content: ReadonlyArray<{
        readonly id: string;
      }>;
      readonly id: string;
      readonly reference: string;
    } | null;
  } | null;
};
export type ArrangeDownPostContentButtonMutation = {
  response: ArrangeDownPostContentButtonMutation$data;
  variables: ArrangeDownPostContentButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
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
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdatePostContentOrderPayload",
    "kind": "LinkedField",
    "name": "updatePostContentOrder",
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "reference",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PostContent",
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": [
              (v1/*: any*/)
            ],
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
    "name": "ArrangeDownPostContentButtonMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArrangeDownPostContentButtonMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "580cb088851f0d83a7752cf1753c7f72",
    "metadata": {},
    "name": "ArrangeDownPostContentButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "6379c05a0cc6bc2f2dd0e91e7019ec7a";

export default node;
