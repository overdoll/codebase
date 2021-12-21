/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ReviewFragment = {
    readonly id: string;
    readonly content: ReadonlyArray<{
        readonly urls: ReadonlyArray<{
            readonly url: string;
            readonly mimeType: string;
        }>;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"PostGalleryContentFragment" | "PostBrandFragment">;
    readonly " $refType": "ReviewFragment";
};
export type ReviewFragment$data = ReviewFragment;
export type ReviewFragment$key = {
    readonly " $data"?: ReviewFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ReviewFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReviewFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryContentFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostBrandFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '9015c8e48847d128def4673ad7289fcb';
export default node;
