/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 64bcddb92bcbe9e8b881150fd56d3c2a */

import { ConcreteRequest } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type UpdatePostContentInput = {
    id: string;
    content: Array<string>;
};
export type useUpdateContentMutationVariables = {
    input: UpdatePostContentInput;
};
export type useUpdateContentMutationResponse = {
    readonly updatePostContent: {
        readonly post: {
            readonly id: string;
            readonly content: ReadonlyArray<{
                readonly id: string;
                readonly type: ResourceType;
                readonly urls: ReadonlyArray<{
                    readonly url: unknown;
                    readonly mimeType: string;
                }>;
            }>;
        } | null;
    } | null;
};
export type useUpdateContentMutation = {
    readonly response: useUpdateContentMutationResponse;
    readonly variables: useUpdateContentMutationVariables;
};



/*
mutation useUpdateContentMutation(
  $input: UpdatePostContentInput!
) {
  updatePostContent(input: $input) {
    post {
      id
      content {
        id
        type
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
    "concreteType": "UpdatePostContentPayload",
    "kind": "LinkedField",
    "name": "updatePostContent",
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
    "name": "useUpdateContentMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateContentMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "64bcddb92bcbe9e8b881150fd56d3c2a",
    "metadata": {},
    "name": "useUpdateContentMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = 'b8c998670501e53a613bac02ebd7427d';
export default node;
