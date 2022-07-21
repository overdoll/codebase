/**
 * @generated SignedSource<<a1fb69e6638a6497d54b91793c3db1b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostSupporterContentLockedButtonFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportConditionWrapperFragment" | "ClubSupporterSubscriptionPriceButtonFragment">;
  readonly " $fragmentType": "PostSupporterContentLockedButtonFragment";
};
export type PostSupporterContentLockedButtonFragment$key = {
  readonly " $data"?: PostSupporterContentLockedButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentLockedButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostSupporterContentLockedButtonFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportConditionWrapperFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupporterSubscriptionPriceButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "592829a18961119824479f19cb7f33c1";

export default node;
