/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type PostBrandFragment = {
    readonly brand: {
        readonly name: string;
        readonly thumbnail: {
            readonly type: ResourceType;
            readonly urls: ReadonlyArray<{
                readonly mimeType: string;
                readonly url: unknown;
            }>;
        } | null;
    } | null;
    readonly " $refType": "PostBrandFragment";
};
export type PostBrandFragment$data = PostBrandFragment;
export type PostBrandFragment$key = {
    readonly " $data"?: PostBrandFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostBrandFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostBrandFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Brand",
      "kind": "LinkedField",
      "name": "brand",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "thumbnail",
          "plural": false,
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
                  "name": "mimeType",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "url",
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
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '3224316cbdb403b85c8ee5bfe988e051';
export default node;
