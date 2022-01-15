/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 9ea7c23d5abd5d3f17baf09a2087db58 */

import { ConcreteRequest } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type AddPostContentInput = {
    id: string;
    content: Array<string>;
};
export type ProcessUploadsMutationVariables = {
    input: AddPostContentInput;
};
export type ProcessUploadsMutationResponse = {
    readonly addPostContent: {
        readonly post: {
            readonly id: string;
            readonly reference: string;
            readonly content: ReadonlyArray<{
                readonly id: string;
                readonly type: ResourceType;
                readonly processed: boolean;
                readonly urls: ReadonlyArray<{
                    readonly url: string;
                    readonly mimeType: string;
                }>;
            }>;
        } | null;
    } | null;
};
export type ProcessUploadsMutation = {
    readonly response: ProcessUploadsMutationResponse;
    readonly variables: ProcessUploadsMutationVariables;
};



/*
mutation ProcessUploadsMutation(
  $input: AddPostContentInput!
) {
  addPostContent(input: $input) {
    post {
      id
      reference
      content {
        id
        type
        processed
        urls {
          url
          mimeType
        }
      }
    }
  }
}
*/

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
    "concreteType": "AddPostContentPayload",
    "kind": "LinkedField",
    "name": "addPostContent",
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
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "processed",
                "storageKey": null
              },
              {
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
    "name": "ProcessUploadsMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProcessUploadsMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "9ea7c23d5abd5d3f17baf09a2087db58",
    "metadata": {},
    "name": "ProcessUploadsMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '619ecedb8295f38f93bcb20c88a6530c';
export default node;
