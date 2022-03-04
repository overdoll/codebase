/**
 * @generated SignedSource<<2e9a71b5acc3dc1c2acc77ec6bb5c38c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostGalleryPublicDetailedFragment$data = {
  readonly id: string;
  readonly reference: string;
  readonly content: ReadonlyArray<{
    readonly type: ResourceType;
    readonly " $fragmentSpreads": FragmentRefs<"PostMediaFragment">;
  }>;
  readonly " $fragmentType": "PostGalleryPublicDetailedFragment";
};
export type PostGalleryPublicDetailedFragment = PostGalleryPublicDetailedFragment$data;
export type PostGalleryPublicDetailedFragment$key = {
  readonly " $data"?: PostGalleryPublicDetailedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicDetailedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostGalleryPublicDetailedFragment",
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "536018749c7e18bc9c9cf04cee7f4ba3";

export default node;
