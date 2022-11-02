/**
 * @generated SignedSource<<02e64dd4af3529c66ce252bcc295c554>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostReviewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostStaticAudienceFragment" | "PostStaticCategoriesFragment" | "PostStaticCharactersFragment" | "PostStaticRequestCharactersFragment" | "RawCinematicContentFragment" | "isFailedFragment" | "isProcessedFragment">;
  readonly " $fragmentType": "PostReviewFragment";
};
export type PostReviewFragment$key = {
  readonly " $data"?: PostReviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostReviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostReviewFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RawCinematicContentFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "isProcessedFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "isFailedFragment"
    },
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

(node as any).hash = "aa819105a4ef336d66031a780acf5621";

export default node;
