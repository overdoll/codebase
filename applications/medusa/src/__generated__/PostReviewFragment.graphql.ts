/**
 * @generated SignedSource<<4afb32a8064f7f32d5d7ff8a307a03b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostReviewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostStaticAudienceFragment" | "PostStaticCategoriesFragment" | "PostStaticCharactersFragment" | "RawCinematicContentFragment" | "isFailedFragment" | "isProcessedFragment">;
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
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "82c4cbdeff340ed572e02187f4648b3f";

export default node;
