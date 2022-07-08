/**
 * @generated SignedSource<<16a43ad05d5bd95e33c1faf9faed58bb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostTagsPreviewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostStaticAudienceFragment" | "PostStaticCategoriesFragment" | "PostStaticCharactersFragment">;
  readonly " $fragmentType": "PostTagsPreviewFragment";
};
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
