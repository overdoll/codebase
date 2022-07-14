/**
 * @generated SignedSource<<e69d636920aff01cdd031a4c6b8b2744>>
 * @relayHash 9d525423c15017ff1651c87bdb3c7b4e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 9d525423c15017ff1651c87bdb3c7b4e

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdatePostContentIsSupporterOnlyInput = {
  contentIds: ReadonlyArray<string>;
  id: string;
  isSupporterOnly: boolean;
};
export type SupporterPostContentButtonMutation$variables = {
  input: UpdatePostContentIsSupporterOnlyInput;
};
export type SupporterPostContentButtonMutation$data = {
  readonly updatePostContentIsSupporterOnly: {
    readonly post: {
      readonly content: ReadonlyArray<{
        readonly isSupporterOnly: boolean;
        readonly resource: {
          readonly id: string;
        };
        readonly viewerCanViewSupporterOnlyContent: boolean;
      }>;
      readonly id: string;
      readonly reference: string;
    } | null;
  } | null;
};
export type SupporterPostContentButtonMutation = {
  response: SupporterPostContentButtonMutation$data;
  variables: SupporterPostContentButtonMutation$variables;
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
  "name": "reference",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerCanViewSupporterOnlyContent",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSupporterOnly",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "resource",
  "plural": false,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SupporterPostContentButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdatePostContentIsSupporterOnlyPayload",
        "kind": "LinkedField",
        "name": "updatePostContentIsSupporterOnly",
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PostContent",
                "kind": "LinkedField",
                "name": "content",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/)
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
    "name": "SupporterPostContentButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdatePostContentIsSupporterOnlyPayload",
        "kind": "LinkedField",
        "name": "updatePostContentIsSupporterOnly",
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PostContent",
                "kind": "LinkedField",
                "name": "content",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
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
    ]
  },
  "params": {
    "id": "9d525423c15017ff1651c87bdb3c7b4e",
    "metadata": {},
    "name": "SupporterPostContentButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "6aa3bcc8e5c3a0181693707be20e7c57";

export default node;
