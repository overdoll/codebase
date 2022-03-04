/**
 * @generated SignedSource<<07e57f61d8657f138f798326a18cbb70>>
 * @relayHash 3f9ead09ba7b3ff6dbe83df766038b23
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3f9ead09ba7b3ff6dbe83df766038b23

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type UpdatePostContentOrderInput = {
  contentIds: ReadonlyArray<string>;
  id: string;
};
export type UpdateContentButtonMutation$variables = {
  input: UpdatePostContentOrderInput;
};
export type UpdateContentButtonMutationVariables = UpdateContentButtonMutation$variables;
export type UpdateContentButtonMutation$data = {
  readonly updatePostContentOrder: {
    readonly post: {
      readonly id: string;
      readonly content: ReadonlyArray<{
        readonly id: string;
        readonly resource: {
          readonly type: ResourceType;
          readonly processed: boolean;
          readonly urls: ReadonlyArray<{
            readonly url: string;
            readonly mimeType: string;
          }>;
        };
      }>;
    } | null;
  } | null;
};
export type UpdateContentButtonMutationResponse = UpdateContentButtonMutation$data;
export type UpdateContentButtonMutation = {
  variables: UpdateContentButtonMutationVariables;
  response: UpdateContentButtonMutation$data;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "processed",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "urls",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "url",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mimeType",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateContentButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PostContent",
                "kind": "LinkedField",
                "name": "content",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Resource",
                    "kind": "LinkedField",
                    "name": "resource",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateContentButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PostContent",
                "kind": "LinkedField",
                "name": "content",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Resource",
                    "kind": "LinkedField",
                    "name": "resource",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "3f9ead09ba7b3ff6dbe83df766038b23",
    "metadata": {},
    "name": "UpdateContentButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "332f558c862f6ea71bdfb9cef3fc973c";

export default node;
