/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash f45286610b48af3f6bdc4652b7a753e4 */

import { ConcreteRequest } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type RemovePostContentInput = {
    id: string;
    contentIds: Array<string>;
};
export type ArrangeUploadsMutationVariables = {
    input: RemovePostContentInput;
};
export type ArrangeUploadsMutationResponse = {
    readonly removePostContent: {
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
export type ArrangeUploadsMutation = {
    readonly response: ArrangeUploadsMutationResponse;
    readonly variables: ArrangeUploadsMutationVariables;
};



/*
mutation ArrangeUploadsMutation(
  $input: RemovePostContentInput!
) {
  removePostContent(input: $input) {
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
    "concreteType": "RemovePostContentPayload",
    "kind": "LinkedField",
    "name": "removePostContent",
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
    "name": "ArrangeUploadsMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArrangeUploadsMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "f45286610b48af3f6bdc4652b7a753e4",
    "metadata": {},
    "name": "ArrangeUploadsMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = 'bc4a217a6059cd12c2a8d4f4610e9e75';
export default node;
