/**
 * @generated SignedSource<<dab781fa856b5a245469da00cd62c6a4>>
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
  readonly " $fragmentSpreads": FragmentRefs<"CinematicCarouselFragment" | "PreviewGalleryFragment">;
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
      "name": "CinematicCarouselFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "86d929870281d0d846d030e1ee610eb0";

export default node;
