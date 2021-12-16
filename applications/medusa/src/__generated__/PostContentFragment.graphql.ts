/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type PostContentFragment = {
    readonly content: ReadonlyArray<{
        readonly type: ResourceType;
        readonly urls: ReadonlyArray<{
            readonly url: unknown;
            readonly mimeType: string;
        }>;
    }>;
    readonly " $refType": "PostContentFragment";
};
export type PostContentFragment$data = PostContentFragment;
export type PostContentFragment$key = {
    readonly " $data"?: PostContentFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostContentFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
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
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '8ed950c515d0415c132538902e16ffbb';
export default node;
