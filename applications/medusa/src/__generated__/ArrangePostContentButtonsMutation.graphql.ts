/**
 * @generated SignedSource<<5f5dcd48a7280908939e866d32a42762>>
 * @relayHash 286ba16232353420fbea1e9b0d97e057
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 286ba16232353420fbea1e9b0d97e057

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdatePostContentOrderInput = {
  contentIds: ReadonlyArray<string>;
  id: string;
};
export type ArrangePostContentButtonsMutation$variables = {
  input: UpdatePostContentOrderInput;
};
export type ArrangePostContentButtonsMutation$data = {
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
export type ArrangePostContentButtonsMutation = {
  response: ArrangePostContentButtonsMutation$data;
  variables: ArrangePostContentButtonsMutation$variables;
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
    "name": "ArrangePostContentButtonsMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArrangePostContentButtonsMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "286ba16232353420fbea1e9b0d97e057",
    "metadata": {},
    "name": "ArrangePostContentButtonsMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "8fa56314e90b702ee0ba85ac99ff2a47";

export default node;
