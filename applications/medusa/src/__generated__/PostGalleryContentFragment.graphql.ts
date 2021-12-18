/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type PostGalleryContentFragment = {
    readonly content: ReadonlyArray<{
        readonly type: ResourceType;
        readonly urls: ReadonlyArray<{
            readonly url: string;
            readonly mimeType: string;
        }>;
    }>;
    readonly " $refType": "PostGalleryContentFragment";
};
export type PostGalleryContentFragment$data = PostGalleryContentFragment;
export type PostGalleryContentFragment$key = {
    readonly " $data"?: PostGalleryContentFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostGalleryContentFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostGalleryContentFragment",
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
(node as any).hash = '319464ef55f5ff77e2a4ae4625bffc30';
export default node;
