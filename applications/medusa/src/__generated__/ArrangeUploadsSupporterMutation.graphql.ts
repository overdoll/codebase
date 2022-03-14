/**
 * @generated SignedSource<<554e8ece39d9c3a819b3c0ad57edac56>>
 * @relayHash 5df467ada323ea883038a68c859c51d9
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 5df467ada323ea883038a68c859c51d9

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdatePostContentIsSupporterOnlyInput = {
  contentIds: ReadonlyArray<string>;
  id: string;
  isSupporterOnly: boolean;
};
export type ArrangeUploadsSupporterMutation$variables = {
  input: UpdatePostContentIsSupporterOnlyInput;
};
export type ArrangeUploadsSupporterMutationVariables = ArrangeUploadsSupporterMutation$variables;
export type ArrangeUploadsSupporterMutation$data = {
  readonly updatePostContentIsSupporterOnly: {
    readonly post: {
      readonly id: string;
      readonly reference: string;
      readonly content: ReadonlyArray<{
        readonly isSupporterOnly: boolean;
        readonly resource: {
          readonly id: string;
        };
      }>;
    } | null;
  } | null;
};
export type ArrangeUploadsSupporterMutationResponse = ArrangeUploadsSupporterMutation$data;
export type ArrangeUploadsSupporterMutation = {
  variables: ArrangeUploadsSupporterMutationVariables;
  response: ArrangeUploadsSupporterMutation$data;
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
  "name": "isSupporterOnly",
  "storageKey": null
},
v5 = {
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
    "name": "ArrangeUploadsSupporterMutation",
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArrangeUploadsSupporterMutation",
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
    "id": "5df467ada323ea883038a68c859c51d9",
    "metadata": {},
    "name": "ArrangeUploadsSupporterMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "399255e66f5923e1fcdeb17171c08bff";

export default node;
