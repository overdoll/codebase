/**
 * @flow
 * @relayHash 41d24a061a2300f25a8fd0c4e16dc6ba
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type UpdatePostContentInput = {|
  id: string,
  content: $ReadOnlyArray<string>,
|};
export type UpdatePostFlowContentMutationVariables = {|
  input: UpdatePostContentInput
|};
export type UpdatePostFlowContentMutationResponse = {|
  +updatePostContent: ?{|
    +post: ?{|
      +id: string,
      +content: $ReadOnlyArray<{|
        +id: string,
        +type: ResourceType,
        +urls: $ReadOnlyArray<{|
          +url: any,
          +mimeType: string,
        |}>,
      |}>,
    |}
  |}
|};
export type UpdatePostFlowContentMutation = {|
  variables: UpdatePostFlowContentMutationVariables,
  response: UpdatePostFlowContentMutationResponse,
|};


/*
mutation UpdatePostFlowContentMutation(
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
    "name": "UpdatePostFlowContentMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdatePostFlowContentMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "41d24a061a2300f25a8fd0c4e16dc6ba",
    "metadata": {},
    "name": "UpdatePostFlowContentMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '4bf2f12ee1495c7fb70980c9b35f0cfd';
module.exports = node;
