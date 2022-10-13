/**
 * @generated SignedSource<<17b6a55fbf85967c418bf24645fef265>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FeatureSupportSummaryFragment$data = {
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment">;
  readonly " $fragmentType": "FeatureSupportSummaryFragment";
};
export type FeatureSupportSummaryFragment$key = {
  readonly " $data"?: FeatureSupportSummaryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FeatureSupportSummaryFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeatureSupportSummaryFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubIconFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "1a6fcc57593d6b679d664fff602d7a82";

export default node;
