/**
 * @generated SignedSource<<dfaa10a9c048543cbfd58dc4ff7e5350>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostTagsPreviewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostStaticAudienceFragment" | "PostStaticCategoriesFragment" | "PostStaticCharactersFragment" | "PostStaticRequestCharactersFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostStaticRequestCharactersFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "ea1623b35079a7c85ebcbb6735c1512d";

export default node;
