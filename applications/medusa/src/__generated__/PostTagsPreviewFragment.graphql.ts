/**
 * @generated SignedSource<<8e38e99fc261e3ce60bdcb4da4177882>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostTagsPreviewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostStaticAudienceFragment" | "PostStaticCharactersFragment" | "PostStaticCategoriesFragment">;
  readonly " $fragmentType": "PostTagsPreviewFragment";
};
export type PostTagsPreviewFragment = PostTagsPreviewFragment$data;
export type PostTagsPreviewFragment$key = {
  readonly " $data"?: PostTagsPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostTagsPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostTagsPreviewFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostStaticAudienceFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostStaticCharactersFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostStaticCategoriesFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "bcbee155f6609a55ff040453760f5bce";

export default node;
