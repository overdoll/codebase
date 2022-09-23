/**
 * @generated SignedSource<<ade26c8096cf73150d7c3b082545c565>>
 * @relayHash 33bbb1c56a99d37741267989a651fc95
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 33bbb1c56a99d37741267989a651fc95

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
        readonly id: string;
        readonly isSupporterOnly: boolean;
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
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "viewerCanViewSupporterOnlyContent",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isSupporterOnly",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SupporterPostContentButtonMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SupporterPostContentButtonMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "33bbb1c56a99d37741267989a651fc95",
    "metadata": {},
    "name": "SupporterPostContentButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "a86bba1fa5950bc5bc6f14ac07ea1a99";

export default node;
