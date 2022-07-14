/**
 * @generated SignedSource<<d9cc8ac425c8ade94a8a5326b74e6f3d>>
 * @relayHash 6303e5ec66cd0582e5a531117a10f291
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 6303e5ec66cd0582e5a531117a10f291

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdatePostContentOrderInput = {
  contentIds: ReadonlyArray<string>;
  id: string;
};
export type ArrangeUpPostContentButtonMutation$variables = {
  input: UpdatePostContentOrderInput;
};
export type ArrangeUpPostContentButtonMutation$data = {
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
export type ArrangeUpPostContentButtonMutation = {
  response: ArrangeUpPostContentButtonMutation$data;
  variables: ArrangeUpPostContentButtonMutation$variables;
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
    "name": "ArrangeUpPostContentButtonMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArrangeUpPostContentButtonMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "6303e5ec66cd0582e5a531117a10f291",
    "metadata": {},
    "name": "ArrangeUpPostContentButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "e3a5ec6c965a6bf948fc5885d4de6dcb";

export default node;
