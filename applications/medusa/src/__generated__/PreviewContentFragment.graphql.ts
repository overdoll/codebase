/**
 * @generated SignedSource<<63713714d746e7a920d462d0e5189f7a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewContentFragment$data = {
  readonly content: ReadonlyArray<{
    readonly __typename: "PostContent";
  }>;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewCarouselFragment" | "PreviewGalleryFragment">;
  readonly " $fragmentType": "PreviewContentFragment";
};
export type PreviewContentFragment$key = {
  readonly " $data"?: PreviewContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewContentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewContentFragment",
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
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PreviewGalleryFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PreviewCarouselFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "75a090739102a8b37ffbb49a9a591390";

export default node;
